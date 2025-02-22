import { Component, HostListener } from "@angular/core";
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
  pagination: number = 40;
  dataSource: IAuthorCard[] = [];

  constructor(private readonly dataService: GridDataService) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  loading: boolean = false;

  private async loadData(): Promise<void> {
    this.loading = true;
    const allTableData = await this.dataService.getGridData();
    const tableData = await this.dataService.getGridDataPagination(
      this.startPagination,
      this.pagination
    );

    this.countComposition = allTableData.length;
    this.dataSource = [...this.dataSource, ...tableData];
    this.startPagination += this.pagination;
    this.loading = false;
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.documentElement.scrollHeight - 200;

    if (
      scrollPosition >= threshold &&
      this.startPagination < this.countComposition
    ) {
      this.loadData();
    }
  }
}
