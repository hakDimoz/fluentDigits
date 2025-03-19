import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioElement?: HTMLAudioElement;

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
