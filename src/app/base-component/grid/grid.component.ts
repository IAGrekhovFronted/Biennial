import { Component, HostListener } from "@angular/core";
import { MainAuthorCardComponent } from "../main-author-card/main-author-card.component";
import {
  IAuthorCard,
  IFiltersData,
  TargetCardEnum,
} from "@models/grid-data.interface";

import { Router } from "@angular/router";

import { GridDataService } from "@services/grid-data.service";
import { FilterOptionsService } from "@services/filter-options.service";

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
  filteredDataSource: IAuthorCard[] = [];

  selectedOptionSearch: string | null = null;
  selectedOptionFilters: IFiltersData = {};

  constructor(
    private readonly dataService: GridDataService,
    private readonly router: Router,
    private readonly filterDataService: FilterOptionsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.filterDataService.$selectedOption.subscribe((value) => {
      this.selectedOptionSearch = value;
      if (!value)
        this.filteredDataSource = JSON.parse(JSON.stringify(this.dataSource));
      else
        this.filteredDataSource = this.dataService.dataFilters(
          this.dataSource,
          value
        );
    });

    this.filterDataService.$selectedOptionsArray.subscribe((value) => {
      console.log("-*/-*/-*/");
      console.log(value || checkArrayFields(value));
      console.log("Условие checkArrayFields", checkArrayFields(value));
      if (!value || checkArrayFields(value)) {
        console.log("Условие checkArrayFields", checkArrayFields(value));
        this.filteredDataSource = JSON.parse(JSON.stringify(this.dataSource));
      } else {
        this.filteredDataSource = this.dataService.filterDataObject(
          value,
          this.filteredDataSource
        );
      }
    });
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
    this.filteredDataSource = JSON.parse(JSON.stringify(this.dataSource));

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

  openAuthorCard(documentId: string, targetCard: TargetCardEnum) {
    this.router.navigate([targetCard, documentId]);
  }
  openTest() {
    this.router.navigate(["composition", "q0snvitcc2yc3f88ovitdjzr"]);
  }

  testFilters() {
    console.log("==========");
    console.log(this.selectedOptionSearch);
    console.log(this.dataSource);
    console.log(this.filteredDataSource);
  }
}

function checkArrayFields(
  data: { [key: string]: string[] | null } | null
): boolean {
  if (!data) return true;

  for (const key in data) {
    if (data[key] && data[key]!.length > 0) {
      return false;
    }
  }

  return true;
}
