import { AfterViewInit, Component, Input } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgStyle } from "@angular/common";

import { FilterOptionsService } from "@services/filter-options.service";

@Component({
  selector: "filter",
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
  ],
  templateUrl: "./filter.component.html",
  styleUrl: "./filter.component.css",
})
export class FilterComponent implements AfterViewInit {
  myControl = new FormControl<string[]>([]);
  widthFilter = { width: "auto" };

  @Input() title!: string;
  @Input() options = [];
  @Input() width: string = "100px";

  constructor(private readonly sendfilterService: FilterOptionsService) {
    this.myControl.valueChanges.subscribe((value) => {
      this.sendfilterService.setSelectedOptionsArray(value, this.title);
    });
  }

  ngAfterViewInit(): void {
    // this.widthFilter = { width: this.width };
  }
}
