import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ClickedOutsideDirective } from '../clicked-outside.directive';

@Component({
  selector: 'app-combobox',
  imports: [FormsModule, ClickedOutsideDirective, NgClass],
  templateUrl: './combobox.component.html',
  standalone: true,
  animations: [

  ]
})
export class ComboboxComponent {
  name = input.required<string>();
  options = input.required<string[]>();
  optionSelected = output<string>();

  showOptions = signal(false);
  selectedOption = signal<string | null>(null);
  searchQuery = signal('');

  filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.options().filter((option) =>
      option.toLowerCase().includes(query)
    );
  })

  toggleShowOptions() {
    this.showOptions.update((current) => !current);
  }

  selectOption(option: string) {
    this.selectedOption.set(option);
    this.optionSelected.emit(option);
  }

  clickedOutside() {
    this.showOptions.set(false);
  }

  
}
