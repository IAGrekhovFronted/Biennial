import { Component } from "@angular/core";
import { ToogleIconComponent } from "../toogle-icon/toogle-icon.component";

import { Router } from "@angular/router";

@Component({
  selector: "area-header",
  imports: [ToogleIconComponent],
  templateUrl: "./area-header.component.html",
  styleUrl: "./area-header.component.scss",
})
export class AreaHeaderComponent {
  constructor(private readonly router: Router) {}

  homeRoute() {
    this.router.navigate(["", "grid"]);
  }
}
