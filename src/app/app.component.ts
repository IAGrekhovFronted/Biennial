import { Component } from '@angular/core';
import { TableComponent } from './base-component/table/table.component'


@Component({
  selector: 'app-component',
  imports: [
    TableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
