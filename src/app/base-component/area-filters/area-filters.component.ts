import { Component, Output, EventEmitter } from "@angular/core";
import { SearchComponent } from "../search/search.component";
import { FilterComponent } from "../filter/filter.component";
import { ToogleIconComponent } from "../toogle-icon/toogle-icon.component";

@Component({
  selector: "area-filters",
  imports: [SearchComponent, FilterComponent, ToogleIconComponent],
  templateUrl: "./area-filters.component.html",
  styleUrl: "./area-filters.component.scss",
})
export class AreaFiltersComponent {
  @Output() changeVisible: EventEmitter<string> = new EventEmitter();

  changeVariantVisible(event: string) {
    this.changeVisible.emit(event);
  }
}
