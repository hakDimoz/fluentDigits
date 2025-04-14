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
import { LanguagesService } from '../../languages/languages.service';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { LanguageOption } from '@shared/language.types';

@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-language.component.html',
})
export class SelectLanguageComponent {
  settingsService = inject(SettingsService);
  languageService = inject(LanguagesService);

  extraStyle = input<string>();
  isValid = input.required<boolean>();
  languageChange = output<LanguageOption>();
  languages = this.languageService.languages;
  isLoading = this.languageService.isLoading;
  selectedLanguage!: LanguageOption;
  selectedLanguageName: string = ''; 
  isModalOpen = computed(() => this.settingsService.isModalOpen());

  constructor() {
    // Initilise when settings modal is open
    effect(() => {
      if (this.isModalOpen()) {
        this.initialiseLanguage();
      }
    });

    // Initialise when languages are loaded
    effect(() => {
      if (this.languages().length > 0) {
        this.initialiseLanguage();
      }
    });

    

  }

  initialiseLanguage() {
    this.selectedLanguage =
      this.languages().find(
        (language) =>
          language.code === this.settingsService.selectedLanguage().code
      ) || this.languages()[0];

    this.selectedLanguageName = this.selectedLanguage.name;
  }

  onLanguageChange() {
    this.selectedLanguage = this.languages().find((language) => {

      if (language.name === this.selectedLanguageName) {
        console.log("helo")
        return language;
      }
      return false;
    }
    )!;
    this.languageChange.emit(this.selectedLanguage);
  }
}
