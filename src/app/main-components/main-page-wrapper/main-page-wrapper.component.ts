import { Component } from "@angular/core";
import { AreaFiltersComponent } from "../area-filters/area-filters.component";
import { TableComponent } from "../../base-component/table/table.component";
import { GridComponent } from "src/app/base-component/grid/grid.component";

@Component({
  selector: "main-page-wrapper",
  imports: [AreaFiltersComponent, TableComponent, GridComponent],
  templateUrl: "./main-page-wrapper.component.html",
  styleUrl: "./main-page-wrapper.component.css",
})
export class MainPageWrapperComponent {
  visibleTable: boolean = false;

  changeVisibleVariant(event: string) {
    this.visibleTable = event === "Table";
  }
}
