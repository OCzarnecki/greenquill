import {Injectable} from '@angular/core';

/**
 * Service that allows for registering of shutdown hooks that are run when the application is closed.
 *
 * The closing of the application is detected in app.component via the window:beforeunload event.
 */
@Injectable({
  providedIn: 'root'
})
export class ShutdownHookService {
  private _shutdownHooks: (() => void)[] = [];

  constructor() {
  }

  /**
   * Calls all registered hooks. Must only be called on application shutdown.
   */
  public callShutdownHooks() {
    this._shutdownHooks.forEach(hook => hook())
  }

  /**
   * Register a hook.
   * @param hook function to be run on shutdown.
   */
  public addShutdownHook(hook: () => void): void {
    this._shutdownHooks.push(hook);
  }
}
