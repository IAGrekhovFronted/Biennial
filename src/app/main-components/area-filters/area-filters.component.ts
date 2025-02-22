import { Component } from '@angular/core';
import { SearchComponent } from '../../base-component/search/search.component'
import { FilterComponent } from '../../base-component/filter/filter.component'
import { ToogleIconComponent } from '../../base-component/toogle-icon/toogle-icon.component'

@Component({
  selector: 'area-filters',
  imports: [
    SearchComponent,
    FilterComponent,
    ToogleIconComponent
  ],
  templateUrl: './area-filters.component.html',
  styleUrl: './area-filters.component.scss'
})
export class AreaFiltersComponent {

}
