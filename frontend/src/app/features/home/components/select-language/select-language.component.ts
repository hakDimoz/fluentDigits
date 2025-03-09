import {
  Component,
  effect,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { LanguagesService } from '../../../../shared/languages/languages.service';
import { LanguageOption } from '@shared/language.types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-language.component.html',
})
export class SelectLanguageComponent implements OnInit {
  languageService = inject(LanguagesService);
  languages: LanguageOption[] = [];
  selectedLanguage = signal<LanguageOption | null>(null);
  selectedLanguageChange = output<LanguageOption | null>();

  constructor() {
    effect(() => {
      this.onSelectedLanguageChange();
    });
  }

  ngOnInit() {
    // this.languageService.getLanguages().subscribe((languages) => {
    //   this.languages = languages;
    //   console.log('Languages:', languages);
    // });
  }

  onSelectedLanguageChange() {
    this.selectedLanguageChange.emit(this.selectedLanguage());
  }
}
