import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NoteContent} from '../..';
import {NoteInfo} from '../model/note-info';
import {NotebookService} from '../notebook.service';

/**
 * The note editor.
 */
@Component({
  selector: 'app-editor-component',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {
  noteContent: NoteContent;
  noteInfo: NoteInfo

  constructor(
    private notebookService: NotebookService,
    private route: ActivatedRoute
  ) {
    this.noteContent = new NoteContent();
    this.noteContent.content = 'Type something here!';
  }

  /**
   * Init the component. Setup listener for parameter changes, since components are reused, and not created on every router navigation.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      const id = value.get('id');

      console.debug(`Loading note with id ${id}`);
      this.noteInfo = this.notebookService.getNoteInfo(id);
      this.notebookService.loadNoteContent$(this.noteInfo)
        .subscribe(noteContent => this.noteContent = noteContent);
    });
  }

  /**
   * Triggers on modification of the text field and saves the note to disc.
   */
  onContentChanged(): void {
    this.notebookService.saveNoteContent(this.noteContent)
  }

  /**
   * Handler for delete-note-button.
   */
  clickDeleteNote() {
    this.notebookService.deleteNote(this.noteInfo)

    this.noteInfo = null;
    this.noteContent = null;
  }
}
