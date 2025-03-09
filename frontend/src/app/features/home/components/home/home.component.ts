import { Component, inject, signal } from '@angular/core';
import { SelectLanguageComponent } from "../select-language/select-language.component";
import { SelectNumberRangeComponent } from "../select-number-range/select-number-range.component";
import { LanguageOption } from '@shared/language.types';
import { SettingsService } from '../../../../shared/settings/settings.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SelectLanguageComponent, SelectNumberRangeComponent, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  settingsService = inject(SettingsService);
  router = inject(Router);

  lanuguageOption = signal<LanguageOption | null>(null);
  numberRange = signal<string | null>(null);

  onSelectedLanguageChange(language: LanguageOption | null) { 
    this.lanuguageOption.set(language);
  }

  onNumberRangeChange(range: string | null) {
    this.numberRange.set(range);
  }

  onSubmit() {
    this.settingsService.setLanguageOption(this.lanuguageOption());
    this.settingsService.setNumberRange(this.numberRange());

    this.router.navigate(['/practice']);    
  }
}
