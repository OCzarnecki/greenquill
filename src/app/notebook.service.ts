import {Injectable} from '@angular/core';
import {Notebook} from './model/notebook';
import {StorageService} from './desktop/storage.service';
import {Observable} from 'rxjs';
import {NoteInfo} from './model/note-info';
import {ShutdownHookService} from './desktop/shutdown-hook.service';
import {Folder} from './model/folder';
import {NoteContent} from './model/note-content';

/**
 * Service that provides access to the notebook index.
 */
@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  private _dirty: boolean;
  private _dirtyCallback = this.markDirty.bind(this);

  private _notebook: Notebook;

  get notebook(): Notebook {
    return this._notebook;
  }

  constructor(private storageService: StorageService, shutdownHookService: ShutdownHookService) {
    this._dirty = false;

    shutdownHookService.addShutdownHook(() => {
      if (this._dirty) {
        this.writeNotebook();
      }
    });
  }

  /**
   * Initialise the service. To be called on application startup.
   */
  public init(): void {
    console.debug('initializing NotebookService');
    this._notebook = this.storageService.loadNotebook(this._dirtyCallback);
  }

  /**
   * Create a new note with the provided name in the specified directory.
   *
   * @param name the display title of the note
   * @param parent the folder the note will be placed in (must be part of the notebook)
   */
  public createNote(name: string, parent: Folder) {
    this.storageService.createNoteContent$().subscribe(noteContent => {
      console.debug('Created new NoteContent!');
      parent.addNote(new NoteInfo(noteContent.id, name, this._dirtyCallback));
    });
  }

  /**
   * Mark dirty and schedule write of notebook.
   */
  private markDirty() {
    if (!this._dirty) {
      this._dirty = true;
      setTimeout(() => {
        this.writeNotebook();
      }, 5000);
    }
  }

  private writeNotebook() {
    this._dirty = false;
    this.storageService.writeNotebook(this.notebook);
  }

  /**
   * Get the NoteInfo for the note with given id.
   * @param id the id to look for.
   * @return the NoteInfo, or undefined if the id is invalid.
   */
  public getNoteInfo(id: string): NoteInfo {
    return this.notebook.findNoteWithId(id);
  }

  /**
   * Load NoteContent for a given NoteInfo from storage.
   * @param noteInfo
   * @return Observable that provides the NoteContent once
   *         it is loaded
   */
  public loadNoteContent$(noteInfo: NoteInfo): Observable<NoteContent> {
    return this.storageService.loadNoteContent$(noteInfo.id);
  }

  /**
   * Save a given NoteContent to storage.
   *
   * @param noteContent to save
   */
  public saveNoteContent(noteContent: NoteContent): void {
    this.storageService.saveNoteContent(noteContent);
  }

  /**
   * Permanently deletes a note.
   *
   * @param noteInfo the NoteInfo of the note to delete
   */
  public deleteNote(noteInfo: NoteInfo): void {
    this.storageService.deleteNoteContent(noteInfo.id);
    this.notebook.deleteNoteInfo(noteInfo)
  }
}
