import { Component, OnInit } from "@angular/core";
import { AuthorCardComponent } from "@base-component/author-card/author-card.component";
import { AreaHeaderComponent } from "@base-component/area-header/area-header.component";

import { CardService } from "@services/card.service";
import { ActivatedRoute, Router } from "@angular/router";

import { IAuthorTeam } from "@models/common.interface";
import { ICardInformation } from "@models/card.interface";

@Component({
  selector: "team-page",
  imports: [AuthorCardComponent, AreaHeaderComponent],
  templateUrl: "./team-page.component.html",
  styleUrl: "./team-page.component.css",
})
export class TeamPageComponent implements OnInit {
  documentId!: string;
  datasourceCard!: IAuthorTeam;

  constructor(
    private readonly router: Router,
    private readonly activateRoter: ActivatedRoute,
    private readonly cardServise: CardService
  ) {
    activateRoter.params.subscribe((params) => {
      this.documentId = params["id"];
    });
  }

  async ngOnInit(): Promise<void> {
    this.datasourceCard = await this.cardServise.getCard(
      "author-teams",
      this.documentId,
      "populate=country_origins&populate=composition.series_project&populate=authors"
    );
  }

  openComposition(documentId: string) {
    this.router.navigate(["composition", documentId]);
  }

  openAuthor(documentId: string) {
    this.router.navigate(["author", documentId]);
  }

  getTeamsInfo(): Array<ICardInformation> {
    const resultInfo: Array<ICardInformation> = [];
    console.log(this.datasourceCard);

    const countryOrigins = this.datasourceCard?.country_origins;
    if (countryOrigins?.length > 0 && countryOrigins[0]?.country_localise) {
      resultInfo.push({
        nameField: "СТРАНА ПРОИСХОЖДЕНИЯ",
        valueField: countryOrigins[0].country_localise,
      });
    }

    const countryResidences = this.datasourceCard?.founded_year;
    if (countryResidences) {
      resultInfo.push({
        nameField: "ГОД ОСНОВАНИЯ",
        valueField: countryResidences,
      });
    }

    return resultInfo;
  }
}
