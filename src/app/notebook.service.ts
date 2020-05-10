import {Injectable} from '@angular/core';
import {Notebook} from './model/notebook';
import {StorageService} from './desktop/storage.service';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {NoteInfo} from './model/note-info';
import {ShutdownHookService} from './desktop/shutdown-hook.service';
import {Folder} from './model/folder';

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
   * Create a new note with the provided name in the specified directory.
   *
   * @param name the display title of the note
   * @param parent the folder the note will be placed in
   */
  public createNote(name: string, parent: Folder) {
    this.storageService.createNoteContent().subscribe(noteContent => {
      console.debug('Created new NoteContent!');
      parent.addNote(new NoteInfo(noteContent.id, name, this._dirtyCallback));
    });
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
