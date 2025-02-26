import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { NgClass } from "@angular/common";

@Component({
  selector: "toogle-icon",
  imports: [NgClass],
  templateUrl: "./toogle-icon.component.html",
  styleUrl: "./toogle-icon.component.scss",
})
export class ToogleIconComponent implements OnInit {
  activeGrid: boolean = true;

  @Input() activeButton!: boolean;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.activeGrid = this.activeButton;
  }

  setActiveGrid() {
    this.activeGrid = true;
    this.router.navigate([""], { queryParams: { type: "grid" } });
  }

  setActiveTable() {
    this.activeGrid = false;
    this.router.navigate([""], { queryParams: { type: "table" } });
  }
}
