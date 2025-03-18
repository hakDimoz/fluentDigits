import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { NumberRange } from '../settings.types';

@Component({
  selector: 'app-select-number-range',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-number-range.component.html',
})
export class SelectNumberRangeComponent implements OnInit{
  settingsService = inject(SettingsService);
  numberRangeOptions: NumberRange[] = [
    { min: 0, max: 10 },
    { min: 10, max: 100 },
    { min: 100, max: 1000 },
    { min: 1000, max: 10000 },
    { min: 10000, max: 100000 },
    { min: 100000, max: 1000000 },
  ];
  selectedNumberRange!: NumberRange;
  numberRangeChange = output<NumberRange>();

  ngOnInit() {
    // Makes copy of the selected number range so two-way binding works
    this.selectedNumberRange = this.numberRangeOptions.find((range) => {
      return range.min === this.settingsService.selectedNumberRange().min &&
        range.max === this.settingsService.selectedNumberRange().max;
    }) || this.numberRangeOptions[0];
  }

  onNumberRangeChange() {
    this.numberRangeChange.emit(this.selectedNumberRange);
  }

}
