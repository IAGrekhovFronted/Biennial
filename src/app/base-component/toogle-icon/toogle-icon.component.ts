import { Component, EventEmitter, Output } from '@angular/core';

import { NgClass } from '@angular/common';

import { GetDataService } from '../../../services/get-data.service'

@Component({
  selector: 'toogle-icon',
  imports: [NgClass],
  templateUrl: './toogle-icon.component.html',
  styleUrl: './toogle-icon.component.scss',
  providers: [GetDataService]
})
export class ToogleIconComponent {
  activeGrid: boolean = true;
  activetable: boolean = false;

  @Output() changeVisible: EventEmitter<string> = new EventEmitter()

  async setActiveGrid() {
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
