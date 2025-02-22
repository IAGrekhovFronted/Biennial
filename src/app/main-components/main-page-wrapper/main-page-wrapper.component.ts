import { Component } from "@angular/core";
import { AreaFiltersComponent } from "../area-filters/area-filters.component";
import { TableComponent } from "../../base-component/table/table.component";

@Component({
  selector: "main-page-wrapper",
  imports: [AreaFiltersComponent, TableComponent],
  templateUrl: "./main-page-wrapper.component.html",
  styleUrl: "./main-page-wrapper.component.css",
})
export class MainPageWrapperComponent {}
