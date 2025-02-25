import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilterOptionsService {
  private selectedOptionsSource = new BehaviorSubject<string | null>(null);
  $selectedOption = this.selectedOptionsSource.asObservable();

  private selectedOptionsArray = new BehaviorSubject<{
    [key: string]: string[] | null;
  } | null>(null);
  private inputSelectedOption: { [key: string]: string[] | null } = {};
  $selectedOptionsArray = this.selectedOptionsArray.asObservable();

  setSelectedOption(option: string | null) {
    this.selectedOptionsSource.next(option);
  }

  setSelectedOptionsArray(option: string[] | null, target: string) {
    this.inputSelectedOption[target] = option;
    this.selectedOptionsArray.next(this.inputSelectedOption);
  }
}
