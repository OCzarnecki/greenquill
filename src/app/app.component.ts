import {Component, OnInit} from '@angular/core';

import {StorageService} from './storage.service';
import {Note} from '../note';

/**
 * Root component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  note: Note;
  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  /**
   * Try to load the note from disc or create default otherwise.
   */
  ngOnInit(): void {
    this.storage.loadNote()
      .then(note => {
        this.note = note;
      })
      .catch(reason => {
        this.note = new Note();
        this.note.content = 'Type something here!';
        console.error('Could not load note: ' + reason);
      });
  }

  /**
   * Triggers on modification of the text field and saves the note to disc.
   */
  onContentChanged(): void {
    this.storage.saveNote(this.note);
  }
}
