import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'filter',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgStyle],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements AfterViewInit {
  toppings = new FormControl('');
  widthFilter = { "width": "100px" }

  @Input() title: string = "Меню"
  @Input() options = ['Опция 1', 'Опция 2', 'Опция 3'];
  @Input() width: string = '100px'

  ngAfterViewInit(): void {
    this.widthFilter = { "width": this.width }
  }
}
