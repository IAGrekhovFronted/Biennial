import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { TableDataService } from "@services/table-data.service";
import { IRowTableData } from "src/models/table-data.interface";
import { IFiltersData } from "@models/grid-data.interface";

import { Router } from "@angular/router";
import { FilterOptionsService } from "@services/filter-options.service";

@Component({
  selector: "table-biennial",
  imports: [MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss",
  standalone: true,
})
export class TableComponent implements OnInit {
  countComposition: number = 0;
  startPagination: number = 0;
  pagination: number = 10;

  selectedOptionSearch: string | null = null;
  selectedOptionFilters: IFiltersData = {};

  filteredDataSource: any[] = [];
  dataSource!: MatTableDataSource<IRowTableData>;
  nativeDtatsource!: IRowTableData[];

  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = [
    "author",
    "country",
    "composition",
    "type",
    "biennial",
    "area",
  ];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly dataService: TableDataService,
    private readonly router: Router,
    private readonly filterDataService: FilterOptionsService
  ) {}

  async ngOnInit(): Promise<void> {
    const allTableData = await this.dataService.getTableData();
    const tableData = await this.dataService.getTableDataPagination(
      this.startPagination,
      this.pagination
    );

    this.nativeDtatsource = tableData;
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.sort = this.sort;
    this.countComposition = allTableData.length;

    this.dataSource.filterPredicate = (data: IRowTableData, filter: string) => {
      const normalizedFilter = filter.trim().toLowerCase();
      return (
        data.author.toLowerCase().includes(normalizedFilter) ||
        data.composition.toLowerCase().includes(normalizedFilter)
      );
    };

    this.filterDataService.$selectedOption.subscribe((value) => {
      this.dataSource.filter = value || "";
    });

    this.filterDataService.$selectedOptionsArray.subscribe((value) => {
      if (!this.nativeDtatsource) {
        console.warn("Данные таблицы еще не загружены");
        return;
      }

      const keyMap: Record<string, keyof IRowTableData> = {
        ТИП: "type",
        "БИЕННАЛЕ №": "biennial",
        СТРАНА: "country",
      };

      if (value && Object.keys(value).length > 0) {
        this.dataSource.data = this.nativeDtatsource.filter((item) => {
          return Object.entries(value).every(([filterKey, filterValues]) => {
            const dataKey = keyMap[filterKey];
            if (!dataKey) {
              return true;
            }
            if (!filterValues || filterValues.length === 0) return true;

            const cellValue = item[dataKey] as string | string[];
            if (Array.isArray(cellValue)) {
              return cellValue.some((val) => filterValues.includes(val));
            }

            return filterValues.includes(cellValue);
          });
        });
      } else {
        this.dataSource.data = [...this.nativeDtatsource];
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  async paginationLeft() {
    if (this.startPagination === 0 || this.pagination > this.countComposition)
      return;
    else {
      this.startPagination -= this.pagination;
      const tableData = await this.dataService.getTableDataPagination(
        this.startPagination,
        this.pagination
      );
      this.dataSource = new MatTableDataSource(tableData);
    }
  }
  async paginationRight() {
    if (this.startPagination + this.pagination >= this.countComposition) return;
    else {
      this.startPagination += this.pagination;
      const tableData = await this.dataService.getTableDataPagination(
        this.startPagination,
        this.pagination
      );
      this.dataSource = new MatTableDataSource(tableData);
    }
  }

  openComposition(documentId: string) {
    this.router.navigate(["composition", documentId]);
  }
}
