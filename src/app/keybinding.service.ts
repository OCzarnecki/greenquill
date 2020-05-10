import {Injectable} from '@angular/core';

/**
 * Data class for a keybinding, containing information about the keyboard shortcut and the action to be taken on invocation.
 */
class Keybinding {
  constructor(
    public key: string,
    public action: () => void,
    public alt: boolean,
    public ctrl: boolean,
    public shift: boolean
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class KeybindingService {

  private bindings: Keybinding[] = [];

  constructor() {
  }

  /**
   * Register a new global keybinding.
   *
   * @param key string key descriptor (eg. 'n', 'Shift', 'F1', ...)
   * @param action function to be called on keypress
   * @param alt true if alt needs to be pressed for keybinding to trigger
   * @param ctrl true if ctrl needs to be pressed for keybinding to trigger
   * @param shift true if shift needs to be pressed for keybinding to trigger
   */
  public registerKeybinding(key: string, action: () => void, alt: boolean = false, ctrl: boolean = false, shift: boolean = false) {
    const binding = new Keybinding(key, action, alt, ctrl, shift);
    this.bindings.push(binding);
  }

  /**
   * Trigger all keybindings that match this keypress.
   *
   * @param $event the KeyboardEvent
   */
  public handleKeypress($event: KeyboardEvent) {
    this.bindings.forEach((binding) => {
      if (binding.key == $event.key
        && binding.alt == $event.altKey
        && binding.ctrl == $event.ctrlKey
        && binding.shift == $event.shiftKey) {
        binding.action();
      }
    });
  }
}
