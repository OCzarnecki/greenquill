import {Notebook} from '../model/notebook';
import {NoteContent} from '../..';
import {Observable} from 'rxjs';

/**
 * Stub for the StorageService, for testing without invoking IO. Will simply provide the set values to callers.
 */
export class StorageServiceStub {
  public notebook: Notebook;
  public noteContent: NoteContent;

  // Usage hidden by angular DI
  // noinspection JSUnusedGlobalSymbols
  loadNotebook(): Promise<Notebook> {
    return new Promise<Notebook>(resolve => resolve(this.notebook));
  }

  // Usage hidden by angular DI
  // noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
  loadNoteContent(id): Promise<NoteContent> {
    return new Promise<NoteContent>(resolve => resolve(this.noteContent));
  }

  // Usage hidden by angular DI
  // noinspection JSUnusedGlobalSymbols
  createNoteContent(): Observable<NoteContent> {
    const noteContent = new NoteContent();
    noteContent.id = 'some id';
    return new Observable<NoteContent>(subscriber => subscriber.next(noteContent));
  }
}
