import {Injectable} from '@angular/core';
import {Note} from '../note';

/**
 * Service for saving/loading notes from disc.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private fs;

  constructor() {
    // Obtain electron's require function. The default one is overwritten by angular.
    this.fs = window.require('fs');
  }

  /**
   * Loads the note from disc.
   * @return A promise containing either the note, an IO-Error or a parsing error.
   */
  public loadNote(): Promise<Note> {
    return new Promise<Note>((resolve, reject) => {
      this.fs.readFile('data', 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(Note.deserialize(data));
        }
      });
    });
  }

  /**
   * Save the provided note to disc.
   * @param note The note to store.
   */
  public saveNote(note: Note) {
    this.fs.writeFile('data', note.serialize(), err => {
      if (err) {
        console.error(err);
      }
    });
  }
}
