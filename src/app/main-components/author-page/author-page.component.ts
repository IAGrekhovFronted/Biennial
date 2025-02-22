import { Component, OnInit } from "@angular/core";
import { AuthorCardComponent } from "@base-component/author-card/author-card.component";

import { CardService } from "@services/card.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "author-page",
  imports: [AuthorCardComponent],
  templateUrl: "./author-page.component.html",
  styleUrl: "./author-page.component.css",
})
export class AuthorPageComponent implements OnInit {
  documentId!: string;
  datasource: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cardServise: CardService
  ) {
    route.params.subscribe((params) => {
      this.documentId = params["id"];
    });
  }

  async ngOnInit(): Promise<void> {
    this.datasource = await this.cardServise.getCard(
      "authors",
      this.documentId,
      "populate=country_origins&populate=composition.series_project&populate=author_teams"
    );
    console.log(this.datasource);
  }
}
