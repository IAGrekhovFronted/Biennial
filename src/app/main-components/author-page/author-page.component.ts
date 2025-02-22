import { Component } from "@angular/core";
import { AuthorCardComponent } from "../../base-component/author-card/author-card.component";

@Component({
  selector: "author-page",
  imports: [AuthorCardComponent],
  templateUrl: "./author-page.component.html",
  styleUrl: "./author-page.component.css",
})
export class AuthorPageComponent {}
