import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FilterDataService } from '../../../services/filter-data.service'

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ]
})
export class FilterComponent implements OnInit {
  myControl = new FormControl('');

  constructor(
    private readonly fetchFilter: FilterDataService
  ) { }

  options: string[] = [];

  async ngOnInit() {
    this.options = await this.fetchFilter.getFilterData('projects', 'populate[0]=authors&populate[1]=author_teams')
  }
}
