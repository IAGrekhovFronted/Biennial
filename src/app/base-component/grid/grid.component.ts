import { Component } from "@angular/core";
import { GridDataService } from "../../../services/grid-data.service";
import { MainAuthorCardComponent } from "../main-author-card/main-author-card.component";
import { IAuthorCard } from "../../../models/grid-data.interface";

@Component({
  selector: "grid",
  imports: [MainAuthorCardComponent],
  templateUrl: "./grid.component.html",
  styleUrl: "./grid.component.css",
})
export class GridComponent {
  countComposition: number = 0;
  startPagination: number = 0;
  pagination: number = 10;
  dataSource!: IAuthorCard[];

  constructor(private readonly dataService: GridDataService) {}

  async ngOnInit(): Promise<void> {
    const allTableData = await this.dataService.getGridData();
    const tableData = await this.dataService.getGridDataPagination(
      this.startPagination,
      this.pagination
    );
    this.countComposition = allTableData.length;
    this.dataSource = tableData;
    console.log(this.dataSource);
  }
}
