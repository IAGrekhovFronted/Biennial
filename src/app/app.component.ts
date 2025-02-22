import { Component } from "@angular/core";
// import { MainPageWrapperComponent } from "../app/main-components/main-page-wrapper/main-page-wrapper.component";
import { AuthorCardComponent } from "../app/base-component/author-card/author-card.component";

@Component({
  selector: "app-component",
  // imports: [MainPageWrapperComponent],
  imports: [AuthorCardComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
