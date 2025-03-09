import { Component, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-number-range',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-number-range.component.html',
})
export class SelectNumberRangeComponent {
  numberRangeOptions: string[] = [
    '0 - 10',
    '10 - 100',
    '100 - 1000',
    '1000 - 10000',
    '10000 - 100000',
    '100000 - 1000000',
  ];

  selectedNumberRange = signal<string | null>(null);
  numberRangeChange = output<string | null>();

  constructor() {
    effect(() => {
      this.onNumberRangeChange();
    });
  }

  onNumberRangeChange() {
    this.numberRangeChange.emit(this.selectedNumberRange());
  }
}
