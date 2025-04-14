import { Component, computed, inject, signal } from '@angular/core';
import { SelectLanguageComponent } from '../../../../shared/settings/select-language/select-language.component';
import { SelectNumberRangeComponent } from '../../../../shared/settings/select-number-range/select-number-range.component';
import { LanguageOption } from '@shared/language.types';
import { SettingsService } from '../../../../shared/settings/settings.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NumberRange } from '../../../../shared/settings/settings.types';
import { LanguagesService } from '../../../../shared/languages/languages.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SelectLanguageComponent, SelectNumberRangeComponent, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  settingsService = inject(SettingsService);
  router = inject(Router);
  languageService = inject(LanguagesService);

  selectedLanguage = this.settingsService.selectedLanguage();
  selectedNumberRange = this.settingsService.selectedNumberRange();
  isLanguageValid = signal(true);

  onLanguageChange(language: LanguageOption) {
    this.selectedLanguage = language;
  }

  onNumberRangeChange(numberRange: NumberRange) {
    this.selectedNumberRange = numberRange;
  }

  onSubmit() {
    // Check if the selected language is valid
    if (!this.selectedLanguage) {
      this.isLanguageValid.set(false);
      return;
    }

    this.settingsService.selectedLanguage.set(this.selectedLanguage);
    this.settingsService.selectedNumberRange.set(this.selectedNumberRange);
    this.router.navigate(['/practice']);
    return;
  }
}
