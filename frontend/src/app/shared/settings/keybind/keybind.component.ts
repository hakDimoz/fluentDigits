import { Component, inject, input, OnInit } from '@angular/core';
import { KeybindOption } from '../settings.types';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-keybind',
  standalone: true,
  imports: [],
  templateUrl: './keybind.component.html',
})
export class KeybindComponent  {
  settingsService = inject(SettingsService);
  keybindOption = input.required<KeybindOption>();
  keybind!: string;


  ngOnInit() {
    this.keybind = this.settingsService.getKeybind(this.keybindOption());
  }

}
