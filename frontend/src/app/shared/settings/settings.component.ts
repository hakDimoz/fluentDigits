import {
  Component,
  ElementRef,
  inject,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { SelectNumberRangeComponent } from './select-number-range/select-number-range.component';
import { SettingsService } from './settings.service';
import { LanguageOption } from '@shared/language.types';
import { FormsModule } from '@angular/forms';
import { KeybindOption, NumberRange } from './settings.types';
import { KeybindComponent } from "./keybind/keybind.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SelectLanguageComponent, SelectNumberRangeComponent, FormsModule, KeybindComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  readonly KeybindOption = KeybindOption;
  
  settingsService = inject(SettingsService);
  settingsModal =
    viewChild.required<ElementRef<HTMLDialogElement>>('settingsModal');
  selectedLanguage = this.settingsService.selectedLanguage();
  selectedNumberRange = this.settingsService.selectedNumberRange();
  settingsChange = output();

  onLanguageChange(language: LanguageOption) {
    this.selectedLanguage = language;
  }

  onNumberRangeChange(range: NumberRange) {
    this.selectedNumberRange = range;
  }

  showModal() {
    this.settingsModal().nativeElement.showModal();
  }

  closeModal() {
    this.settingsModal().nativeElement.close();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === this.settingsModal().nativeElement) {
      this.closeModal();
    }
  }

  onSubmit() {
    this.settingsService.selectedLanguage.set(this.selectedLanguage);
    this.settingsService.selectedNumberRange.set(this.selectedNumberRange);
    this.closeModal();
    this.settingsChange.emit();
  }
}
