import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableDataService } from '../../../services/table-data.service'

@Component({
  selector: 'table-biennial',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true
})
export class TableComponent implements OnInit {
  countComposition: number = 0;

  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['author', 'country', 'composition', 'type', 'biennial', 'area'];
  dataSource: any;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly dataService: TableDataService
  ) { }

  async ngOnInit() {
    const tableData = await this.dataService.getTableData()
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.sort = this.sort;
    this.countComposition = tableData.length;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}