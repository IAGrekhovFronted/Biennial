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
  styleUrl: "./author-page.component.css",
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
      "populate=country_origins&populate=composition.series_project&populate=author_teams"
    );
    console.log(this.datasourceCard);
  }

  openComposition(documentId: string) {
    this.router.navigate(["composition", documentId]);
  }
}

function mapDataCard(data: IAuthor) {
  const countryOrigin: ICardInformation = {
    nameField: "СТРАНА ПРОИСХОЖДЕНИЯ",
    valueField: "",
  };
}
