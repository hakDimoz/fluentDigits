import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
  tooltipText = input.required<string>();
}
