import { Component, inject } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-volume',
  standalone: true,
  imports: [],
  templateUrl: './volume.component.html',
})
export class VolumeComponent {
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
}
