import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keybindDisplay',
  standalone: true
})
export class KeybindDisplayPipe implements PipeTransform {

  transform(value: string): string {
    const keyMap: { [key: string]: string } = {
      ' ': 'Space',
      'ArrowUp': '↑',
      'ArrowDown': '↓',
      'ArrowLeft': '←',
      'ArrowRight': '→',
      'Enter': 'Enter ⏎',
      'Backspace': 'Backspace ⌫',
      'Escape': 'Esc',
      'Control': 'Ctrl',
      'Meta': 'Cmd ⌘',
    };

    return keyMap[value] || value;
  }
}
