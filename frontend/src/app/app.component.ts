import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeControllerComponent } from './shared/theme/components/theme-controller/theme-controller.component';
import { LayoutType } from './shared/theme/theme-controller.model';
import { NavBarComponent } from './shared/nav-bar/components/nav-bar/nav-bar.component';
import { InteractionService } from './shared/interaction/interaction.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  readonly LayoutType = LayoutType;
  interactionService = inject(InteractionService);
}
