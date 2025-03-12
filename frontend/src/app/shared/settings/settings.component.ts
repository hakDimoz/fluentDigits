import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  settingsModal = viewChild.required<ElementRef<HTMLDialogElement>>('settingsModal');

  showModal() {
    this.settingsModal().nativeElement.showModal();
  }

  closeModal() {
    this.settingsModal().nativeElement.close();
  }

}
