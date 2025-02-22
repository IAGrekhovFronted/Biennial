import { Component } from "@angular/core";
import { MainPageWrapperComponent } from "../app/main-components/main-page-wrapper/main-page-wrapper.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-component",
  imports: [MainPageWrapperComponent, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
