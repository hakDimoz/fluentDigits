import { Component } from '@angular/core';
import { SelectLanguageComponent } from "../select-language/select-language.component";
import { SelectNumberRangeComponent } from "../select-number-range/select-number-range.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SelectLanguageComponent, SelectNumberRangeComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
