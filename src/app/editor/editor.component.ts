import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NoteContent} from '../..';
import {StorageService} from '../desktop/storage.service';

/**
 * The note editor.
 */
@Component({
  selector: 'app-editor-component',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {
  note: NoteContent;

  constructor(
    private storage: StorageService,
    private route: ActivatedRoute
  ) {
    this.note = new NoteContent();
    this.note.content = 'Type something here!';
  }

  /**
   * Init the component. Setup listener for parameter changes, since components are reused, and not created on every router navigation.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      const id = value.get('id');

      console.debug(`Loading note with id ${id}`);
      this.storage.loadNoteContent(id)
        .then(note => {
          this.note = note;
        })
        .catch(reason => {
          console.error('Could not load note: ' + reason);
        });
    });
  }

  /**
   * Triggers on modification of the text field and saves the note to disc.
   */
  onContentChanged(): void {
    this.storage.saveNoteContent(this.note);
  }
}
