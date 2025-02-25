import { Component, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

import { FilterDataService } from "@services/filter-data.service";
import { FilterOptionsService } from "@services/filter-options.service";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css",
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class SearchComponent implements OnInit {
  myControl = new FormControl("");

  constructor(
    private readonly fetchFilter: FilterDataService,
    private readonly filterOptionSend: FilterOptionsService
  ) {
    this.myControl.valueChanges.subscribe((value) =>
      this.filterOptionSend.setSelectedOption(value)
    );
  }

  options: string[] = [];

  async ngOnInit() {
    this.options = await this.fetchFilter.getFilterData(
      "projects",
      "populate[0]=authors&populate[1]=author_teams"
    );
  }
}
