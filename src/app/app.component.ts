import { Component } from '@angular/core';

import { FilterComponent } from "./base-component/filter/filter.component"

@Component({
  selector: 'app-component',
  imports: [
    FilterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
