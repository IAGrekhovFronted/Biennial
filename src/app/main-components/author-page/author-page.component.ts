import { Component, OnInit } from "@angular/core";
import { AuthorCardComponent } from "@base-component/author-card/author-card.component";
import { AreaHeaderComponent } from "@base-component/area-header/area-header.component";

import { CardService } from "@services/card.service";
import { ActivatedRoute, Router } from "@angular/router";

import { IAuthor } from "@models/common.interface";
import { ICardInformation } from "@models/card.interface";

@Component({
  selector: "author-page",
  imports: [AuthorCardComponent, AreaHeaderComponent],
  templateUrl: "./author-page.component.html",
  styleUrl: "./author-page.component.scss",
})
export class AuthorPageComponent implements OnInit {
  documentId!: string;
  datasourceCard!: IAuthor;
  information: ICardInformation[] = [];

  constructor(
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly cardServise: CardService
  ) {
    activateRoute.params.subscribe((params) => {
      this.documentId = params["id"];
    });
  }

  async ngOnInit(): Promise<void> {
    this.datasourceCard = await this.cardServise.getCard(
      "authors",
      this.documentId,
      "populate=country_origins&populate=composition.series_project&populate=author_teams&populate=city_origin&populate=country_residences"
    );
  }

  openComposition(documentId: string) {
    this.router.navigate(["composition", documentId]);
  }

  openTeams(documentId: string) {
    this.router.navigate(["author-teams", documentId]);
  }

  getAuthorInfo(): Array<ICardInformation> {
    const resultInfo: Array<ICardInformation> = [];

    const countryOrigins = this.datasourceCard?.country_origins;
    if (countryOrigins?.length > 0 && countryOrigins[0]?.country_localise) {
      resultInfo.push({
        nameField: "СТРАНА ПРОИСХОЖДЕНИЯ",
        valueField: countryOrigins[0].country_localise,
      });
    }

    const cityOrigin = this.datasourceCard?.city_origin;
    if (cityOrigin && cityOrigin?.city_localise) {
      resultInfo.push({
        nameField: "ГОРОД ПРОИСХОДЖЕНИЯ",
        valueField: cityOrigin.city_localise,
      });
    }

    const countryResidences = this.datasourceCard?.country_residences;
    if (
      countryResidences?.length > 0 &&
      countryResidences[0]?.country_localise
    ) {
      resultInfo.push({
        nameField: "СТРАНА ПРОЖИВАНИЯ",
        valueField: countryResidences[0].country_localise,
      });
    }

    return resultInfo;
  }
}
