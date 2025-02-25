import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { SearchComponent } from "../search/search.component";
import { FilterComponent } from "../filter/filter.component";
import { ToogleIconComponent } from "../toogle-icon/toogle-icon.component";

import { FetchService } from "@services/fetch.service";

@Component({
  selector: "area-filters",
  imports: [SearchComponent, FilterComponent, ToogleIconComponent],
  templateUrl: "./area-filters.component.html",
  styleUrl: "./area-filters.component.scss",
})
export class AreaFiltersComponent implements OnInit {
  optionsList: { [key: string]: string } = {};

  @Output() changeVisible: EventEmitter<string> = new EventEmitter();

  constructor(private readonly fetchService: FetchService) {}

  async ngOnInit(): Promise<void> {
    for (const option of [
      ["countries", "country_localise"],
      ["edition-biennials", "edition_localise"],
      ["type-projects", "type"],
    ]) {
      const responce = await this.fetchService.getDataEntities(option[0]);
      this.optionsList[option[0]] = responce.map((x: any) => x[option[1]]);
    }
    console.log(this.optionsList);
  }

  changeVariantVisible(event: string) {
    this.changeVisible.emit(event);
  }
}
