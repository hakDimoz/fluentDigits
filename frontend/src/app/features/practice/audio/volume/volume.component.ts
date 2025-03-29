import { Component, inject } from '@angular/core';
import { AudioService } from '../audio.service';
import { SettingsService } from '../../../../shared/settings/settings.service';
import { KeybindOption } from '../../../../shared/settings/settings.types';

@Component({
  selector: 'app-volume',
  standalone: true,
  imports: [],
  templateUrl: './volume.component.html',
  host: {
    '(window:keydown)': 'handleKeyPress($event)',
  },
})
export class VolumeComponent {
  settingsService = inject(SettingsService);
  audioService = inject(AudioService);
  isMuted = false;

  onVolumeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const volume = parseFloat(input.value) / 100;
    this.audioService.setVolume(volume);
  }

  toggleMute() {
    if (this.isMuted) {
      this.audioService.setVolume(1);
    } else {
      this.audioService.setVolume(0);
    }

    this.isMuted = !this.isMuted;
  }
  
  handleKeyPress(event: KeyboardEvent) {
    if (this.settingsService.isModalOpen()) return;

    const keybind = this.settingsService.getKeybind(KeybindOption.MuteAudio);
    if (event.key !== keybind) return;
    
    this.toggleMute();
  }
}
