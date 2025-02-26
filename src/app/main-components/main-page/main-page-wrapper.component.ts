import { Component, OnInit } from "@angular/core";
import { TableComponent } from "@base-component/table/table.component";
import { GridComponent } from "@base-component/grid/grid.component";
import { AreaFiltersComponent } from "@base-component/area-filters/area-filters.component";

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "main-page-wrapper",
  imports: [AreaFiltersComponent, TableComponent, GridComponent],
  templateUrl: "./main-page-wrapper.component.html",
  styleUrl: "./main-page-wrapper.component.css",
})
export class MainPageWrapperComponent implements OnInit {
  visibleTable: boolean = false;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.visibleTable = params.type === "table";
    });
  }
}
