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
  information: ICardInformation[] = [];

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
}
