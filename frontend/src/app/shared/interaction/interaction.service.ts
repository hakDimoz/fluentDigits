import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  hasInteracted = signal<boolean>(false);

  constructor() {
    window.addEventListener('click', () => this.hasInteracted.set(true), {
      once: true,
    });
    window.addEventListener('keydown', () => this.hasInteracted.set(true), {
      once: true,
    });
    window.addEventListener('touchstart', () => this.hasInteracted.set(true), {
      once: true,
    });

    effect(() => {
      console.log('hasInteracted:', this.hasInteracted());
    })
  } 
}
