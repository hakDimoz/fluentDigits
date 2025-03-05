import { Component } from '@angular/core';
import { ThemeControllerComponent } from "../../../theme/components/theme-controller/theme-controller.component";
import { LayoutType } from '../../../theme/theme-controller.model';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ThemeControllerComponent],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  readonly LayoutType = LayoutType;
}
