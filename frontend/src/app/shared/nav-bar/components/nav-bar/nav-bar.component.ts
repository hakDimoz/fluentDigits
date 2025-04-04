import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { ThemeControllerComponent } from '../../../theme/components/theme-controller/theme-controller.component';
import { LayoutType } from '../../../theme/theme-controller.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ThemeControllerComponent],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  readonly LayoutType = LayoutType;
  router = inject(Router);
  helpModal = viewChild.required<ElementRef<HTMLDialogElement>>('helpModal');

  onLogoClick() {
    this.router.navigate(['/']);
  }

  showModal() {
    this.helpModal().nativeElement.showModal();
  }

  closeModal() {
    this.helpModal().nativeElement.close();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === this.helpModal().nativeElement) {
      this.closeModal();
    }
  }
}
