import {Injectable} from '@angular/core';
import {Notebook} from './model/notebook';
import {StorageService} from './desktop/storage.service';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {NoteInfo} from './model/note-info';
import {ShutdownHookService} from './desktop/shutdown-hook.service';

/**
 * Service that provides access to the notebook index.
 */
@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  private _dirty: boolean;
  private _dirtyCallback = this.markDirty.bind(this);

  /**
   * Observable that produces the notebook on subscription. No further values are produced after that.
   */
  public readonly notebook$: Observable<Notebook>;

  constructor(private storageService: StorageService, shutdownHookService: ShutdownHookService) {
    this._dirty = false;
    // fetch notebook asynchronously
    this.notebook$ = new Observable<Notebook>(subscriber => {
      this.storageService.loadNotebook(this._dirtyCallback).then(value => {
        subscriber.next(value);
      });
    }).pipe(shareReplay(1)); // and make it available to later subscribers

    shutdownHookService.addShutdownHook(() => {
      if (this._dirty) {
        this.writeNotebook()
      }
    });
  }

  /**
   * Create a new note with the provided name. Currently, it is undefined in which directory the note will end up.
   *
   * @param name the display title of the note
   */
  public createNote(name: string) {
    this.storageService.createNoteContent().then(noteContent => {
      console.debug('Created new NoteContent!');
      this.notebook$.subscribe(value => {
        console.debug('Received shared notebook value');
        value.folders[0].addNote(new NoteInfo(noteContent.id, name, this._dirtyCallback));
      });
    });
    this.markDirty();
  }

  /**
   * Mark dirty and schedule write of notebook.
   */
  private markDirty() {
    console.debug('Marked dirty!');
    if (!this._dirty) {
      this._dirty = true;
      setTimeout(() => {
        this.writeNotebook();
      }, 5000);
    }
  }

  private writeNotebook() {
    console.debug('Timeout passed!');
    this.notebook$.subscribe(notebook => {
      console.debug('Writing notebook!');
      this._dirty = false;
      this.storageService.writeNotebook(notebook);
    });
  }
}
