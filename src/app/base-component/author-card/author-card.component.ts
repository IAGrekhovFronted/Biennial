import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "author-card",
  imports: [],
  templateUrl: "./author-card.component.html",
  styleUrl: "./author-card.component.css",
})
export class AuthorCardComponent {
  information: string[] = [];

  @Input() photo?: string;
  @Input() nameAuthor?: string;
  @Input() info!: Array<{ nameField: string; valueField: string }>;
}
