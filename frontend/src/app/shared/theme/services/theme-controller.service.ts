import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeControllerService {
  private themeKey: string = 'selected-theme';

  constructor() {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('light');
    }
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selected-theme', theme);
  }

  toggleTheme() {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme');
  }
}
