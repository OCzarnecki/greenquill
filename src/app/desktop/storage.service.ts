import {Injectable} from '@angular/core';
import {NoteContent} from '../..';
import {Notebook} from '../model/notebook';

/**
 * Service for saving/loading notes from disc.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private fs;
  private fsPromises;

  constructor() {
    // Use electron's require function through this weird trick. The default one is overwritten by angular.
    this.fs = window.require('fs');
    this.fsPromises = this.fs.promises;

    this.init();
  }

  private readonly _root = ".greenquill/";

  private init() {
    if (!this.fs.existsSync(this._root)) {
      this.fs.mkdirSync(this._root + "notes", {recursive: true})
    }
  }


  /**
   * Loads the note content from disc.
   * @return A promise containing either the note, an IO-Error or a parsing error.
   */
  public loadNoteContent(id: string): Promise<NoteContent> {
    return this.fsPromises.readFile(`${this._root}notes/${id}.json`, 'utf-8')
      .then(value => NoteContent.deserialize(JSON.parse(value)));
  }

  /**
   * Save the provided note content to disc.
   * @param note The note to store.
   */
  public saveNoteContent(note: NoteContent) {
    this.fsPromises.writeFile(
      `${this._root}notes/${note.id}.json`,
      JSON.stringify(note.serialize())).catch((err) => console.error(err)
    );
  }

  /**
   * Loads the notebook index from disc.
   */
  public loadNotebook(): Promise<Notebook> {
    return this.fsPromises.readFile(this._root + "notebook.json", 'utf-8').then(value => {
      let json = JSON.parse(value);
      return Notebook.deserialize(json);
    });
  }
}
