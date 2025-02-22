import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { TableDataService } from "@services/table-data.service";
import { IRowTableData } from "src/models/table-data.interface";

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
  pagination: number = 20;

  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [
    "author",
    "country",
    "composition",
    "type",
    "biennial",
    "area",
  ];
  dataSource!: MatTableDataSource<IRowTableData>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly dataService: TableDataService) {}

  async ngOnInit(): Promise<void> {
    const allTableData = await this.dataService.getTableData();
    console.log(allTableData);
    const tableData = await this.dataService.getTableDataPagination(
      this.startPagination,
      this.pagination
    );
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.sort = this.sort;
    this.countComposition = allTableData.length;
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
    if (this.pagination > this.countComposition) return;
    else {
      this.startPagination += this.pagination;
      const tableData = await this.dataService.getTableDataPagination(
        this.startPagination,
        this.pagination
      );
      this.dataSource = new MatTableDataSource(tableData);
    }
  }
}
