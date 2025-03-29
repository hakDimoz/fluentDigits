import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { KeybindOption } from '../settings.types';
import { SettingsService } from '../settings.service';
import { KeybindDisplayPipe } from './keybind-display.pipe';

@Component({
  selector: 'app-keybind',
  standalone: true,
  imports: [KeybindDisplayPipe],
  templateUrl: './keybind.component.html',
  host: {
    '(window:keydown)': 'handleKeydown($event)',
  },
})
export class KeybindComponent {
  settingsService = inject(SettingsService);

  keybindOption = input.required<KeybindOption>();
  keybindChange = output<{ option: KeybindOption; keybind: string }>();

  keybind: string = '';
  isListening = false;
  keyIsAlreadyUsed = signal(false);
  isModalOpen = computed(() => this.settingsService.isModalOpen());

  constructor() {
    effect(() => {
      if (this.isModalOpen()) {
        this.keybind = this.settingsService.getKeybind(this.keybindOption());
      } else {
        this.isListening = false;
      }
    });
  }

  startListening() {
    // Prevent listening when other keybinds are listening
    if (this.settingsService.isListeningForKeys() && !this.isListening) return;

    this.isListening = true;
    this.settingsService.isListeningForKeys.set(true);
  }

  stopListening() {
    this.isListening = false;
    this.settingsService.isListeningForKeys.set(false);
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.isListening) return;

    event.preventDefault();
    event.stopPropagation();

    // If key is already used by another keybind, don't update
    if (Object.values(this.settingsService.keybinds()).includes(event.key)) {
      this.keyIsAlreadyUsed.set(true);
      
      setTimeout(() => {
        this.keyIsAlreadyUsed.set(false);
      }, 2000)

      this.stopListening();
      return;
    }

    this.keybind = event.key;
    this.onKeybindChange();
    this.stopListening();
  }

  onKeybindChange() {
    this.keybindChange.emit({
      option: this.keybindOption(),
      keybind: this.keybind,
    });
  }
}
