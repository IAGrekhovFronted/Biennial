import { Component } from '@angular/core';

import { ToogleIconComponent } from "./base-component/toogle-icon/toogle-icon.component"

@Component({
  selector: 'app-component',
  imports: [ToogleIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
