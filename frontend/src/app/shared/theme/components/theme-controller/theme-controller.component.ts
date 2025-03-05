import { Component, inject, Input, input, OnInit } from '@angular/core';
import { LayoutType } from '../../theme-controller.model';
import { ThemeControllerService } from '../../services/theme-controller.service';

@Component({
  selector: 'app-theme-controller',
  standalone: true,
  imports: [],
  templateUrl: './theme-controller.component.html',
})
export class ThemeControllerComponent implements OnInit {
  readonly LayoutType = LayoutType;

  themeService = inject(ThemeControllerService);
  layoutType = input<LayoutType>(LayoutType.NO_BORDER);
  svgSize = input<string>('size-10');
  isChecked = false;

  ngOnInit(): void {
    this.updateCheckbox();
  }

  onThemeControllerClick() {
    this.themeService.toggleTheme();
    this.updateCheckbox();
  }

  updateCheckbox() {
    if (this.themeService.getTheme() === 'light') {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  preventCheckboxClick(event: Event) {
    event?.stopPropagation();
    event.preventDefault();
  }
}
