import {Component, HostListener} from '@angular/core';
import {KeybindingService} from './keybinding.service';
import {ShutdownHookService} from './desktop/shutdown-hook.service';

/**
 * Root component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    private keybindingService: KeybindingService,
    private shutdownHookService: ShutdownHookService
  ) {
  }

  @HostListener('window:keydown', ['$event'])
  onGlobalKeydown($event: KeyboardEvent) {
    this.keybindingService.handleKeypress($event);
  }

  @HostListener('window:beforeunload')
  beforeUnload(): void {
    this.shutdownHookService.callShutdownHooks();
  }
}
