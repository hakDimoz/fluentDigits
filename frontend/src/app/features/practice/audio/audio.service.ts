import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioElement?: HTMLAudioElement;
  duration = signal(0);
  isLoadingAudio = signal(false);
  isPlaying = signal(false);
  hasPlayedOnce = signal(false);

  setAudioElement(audioElement: HTMLAudioElement) {
    this.audioElement = audioElement;
  }

  getAudioElement() {
    return this.audioElement;
  }

  setVolume(volume: number) { 
    if (this.audioElement) {
      this.audioElement.volume = volume;
    }
  }

}
