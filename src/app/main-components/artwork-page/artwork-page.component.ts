import { Component, OnInit } from "@angular/core";
import { AreaHeaderComponent } from "@base-component/area-header/area-header.component";

import { CardService } from "@services/card.service";
import { ActivatedRoute } from "@angular/router";

import { IArtwork } from "@models/common.interface";
import { ICardInformation } from "@models/card.interface";

@Component({
  selector: "artwork-page",
  imports: [AreaHeaderComponent],
  templateUrl: "./artwork-page.component.html",
  styleUrl: "./artwork-page.component.css",
})
export class ArtworkPageComponent implements OnInit {
  documentId!: string;
  datasourceCard!: IArtwork;
  information: ICardInformation[] = [
    { nameField: "СТРАНА ПРОИСХОЖДЕНИЯ", valueField: "США" },
    { nameField: "ГОРОД", valueField: "Нью-Йорк" },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cardServise: CardService
  ) {
    route.params.subscribe((params) => {
      this.documentId = params["id"];
    });
  }

  async ngOnInit(): Promise<void> {
    this.datasourceCard = await this.cardServise.getCard(
      "projects",
      this.documentId,
      "populate=series_project&populate=type_project&populate=biennial&populate=area_creation&populate=explication_area&populate=provided&populate=type_explication&populate=photo&populate=video&populate=additional_material"
    );
    console.log(this.datasourceCard);
  }
}
