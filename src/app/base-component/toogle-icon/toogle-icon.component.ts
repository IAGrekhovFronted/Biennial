import { Component, EventEmitter, Output } from '@angular/core';

import { NgClass } from '@angular/common';

@Component({
  selector: 'toogle-icon',
  imports: [NgClass],
  templateUrl: './toogle-icon.component.html',
  styleUrl: './toogle-icon.component.scss'
})
export class ToogleIconComponent {
  activeGrid: boolean = true;
  activetable: boolean = false;

  @Output() changeVisible: EventEmitter<string> = new EventEmitter()

  setActiveGrid() {
    this.activeGrid = true;
    this.activetable = false;
    this.changeVisible.emit('Grid')
  };

  setActiveTable() {
    this.activeGrid = false;
    this.activetable = true;
    this.changeVisible.emit('Table')
  };
}
