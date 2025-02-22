import { Component, Input } from "@angular/core";
import { IComposition } from "@models/grid-data.interface";

@Component({
  selector: "main-author-card",
  imports: [],
  templateUrl: "./main-author-card.component.html",
  styleUrl: "./main-author-card.component.css",
})
export class MainAuthorCardComponent {
  @Input() photo?: string;
  @Input() nameAuthor?: string;
  @Input() compositions?: IComposition[];
}
