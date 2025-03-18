import { Component, computed, inject, signal } from '@angular/core';
import { SelectLanguageComponent } from '../../../../shared/settings/select-language/select-language.component';
import { SelectNumberRangeComponent } from '../../../../shared/settings/select-number-range/select-number-range.component';
import { LanguageOption } from '@shared/language.types';
import { SettingsService } from '../../../../shared/settings/settings.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NumberRange } from '../../../../shared/settings/settings.types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SelectLanguageComponent, SelectNumberRangeComponent, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  settingsService = inject(SettingsService);
  router = inject(Router);

  selectedLanguage = this.settingsService.selectedLanguage();
  selectedNumberRange = this.settingsService.selectedNumberRange();

  onLanguageChange(language: LanguageOption) {
    this.selectedLanguage = language;
  }

  onNumberRangeChange(numberRange: NumberRange) {
    this.selectedNumberRange = numberRange;
  }

  onSubmit() {
    this.settingsService.selectedLanguage.set(this.selectedLanguage);
    this.settingsService.selectedNumberRange.set(this.selectedNumberRange);
    this.router.navigate(['/practice']);

    return;
  }
}
