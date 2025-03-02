import { Component, OnInit } from "@angular/core";
import { AreaHeaderComponent } from "@base-component/area-header/area-header.component";

import { CardService } from "@services/card.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { IArtwork } from "@models/common.interface";
import { ICardInformation } from "@models/card.interface";

import { ImageComponent } from "@base-component/image-component/image.component";

@Component({
  selector: "artwork-page",
  imports: [AreaHeaderComponent, ImageComponent],
  templateUrl: "./artwork-page.component.html",
  styleUrl: "./artwork-page.component.scss",
  standalone: true,
})
export class ArtworkPageComponent implements OnInit {
  documentId!: string;
  datasourceCard!: IArtwork;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cardServise: CardService,
    private readonly sanitizer: DomSanitizer
  ) {
    route.params.subscribe((params) => {
      this.documentId = params["id"];
    });
  }

  async ngOnInit(): Promise<void> {
    this.datasourceCard = await this.cardServise.getCard(
      "projects",
      this.documentId,
      "populate=series_project&populate=type_project&populate=biennial&populate=area_creation&populate=explication_area&populate=provided&populate=type_explication&populate=photos&populate=videos&populate=additional_materials"
    );
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getArtworkInfo(): Array<ICardInformation> {
    const resultInfo: Array<ICardInformation> = [];

    const biennial = this.datasourceCard?.biennial;
    if (biennial?.edition_localise) {
      resultInfo.push({
        nameField: "БИЕННАЛЕ",
        valueField: biennial?.edition_localise,
      });
    }

    const typeComposition = this.datasourceCard?.type_project;
    if (typeComposition?.type) {
      resultInfo.push({
        nameField: "ТИП",
        valueField: typeComposition?.type,
      });
    }

    const yearCreation = this.datasourceCard?.year_creation;
    if (yearCreation) {
      resultInfo.push({
        nameField: "ГОД СОЗДАНИЯ",
        valueField: yearCreation,
      });
    }

    const explicationArea = this.datasourceCard?.explication_area;
    if (explicationArea?.title_localise) {
      resultInfo.push({
        nameField: "ПЛОЩАДКА ЭКСПЛИКАЦИИ",
        valueField: explicationArea?.title_localise,
      });
    }

    const seriesComposition = this.datasourceCard?.series_project;
    if (seriesComposition.title_series_localise) {
      resultInfo.push({
        nameField: "СЕРИЯ ПРОИЗВЕДЕНИЙ",
        valueField: seriesComposition.title_series_localise,
      });
    }

    return resultInfo;
  }
}
