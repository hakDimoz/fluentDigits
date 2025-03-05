import { Component, Input, input } from '@angular/core';
import { LayoutType } from '../theme-controller.model';

@Component({
  selector: 'app-theme-controller',
  standalone: true,
  imports: [],
  templateUrl: './theme-controller.component.html',
})
export class ThemeControllerComponent {
  readonly LayoutType = LayoutType;

  layoutType = input<LayoutType>(LayoutType.NO_BORDER);
  svgSize = input<string>('')
}
