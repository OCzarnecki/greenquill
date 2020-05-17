import {Folder} from './folder';
import {NoteInfo} from './note-info';

/**
 * The notebook index, containing folder structure, ID -> title mapping, and metadata.
 */
export class Notebook {
  private readonly _folders: Folder[];
  public get folders(): Readonly<Folder[]> {
    return this._folders;
  }

  constructor( // TODO setCallback in folder and noteinfo, events will be propagated down the tree on changes (for testability). Callback will be set automatically when new folders or notes are added to a folder
    folders: Folder[]
  ) {
    this._folders = folders;
  }

  /**
   * Create Notebook from JSON data.
   *
   * @param value the data.
   * @param changeCallback Function to be called whenever the Notebook changes
   */
  static deserialize(value: any, changeCallback: () => void): Notebook {
    return new Notebook(value.folders.map(data => Folder.deserialize(data, changeCallback)));
  }

  public serialize() {
    return {
      'folders': this.folders.map(folder => folder.serialize())
    }
  }

  /**
   * Search the folder tree for NoteInfo with given id.
   * @param id
   */
  public findNoteWithId(id: string) {
    return this.folders.map(folder => {
      for (let subfolder of folder) {
        const note = subfolder.notes.find(note => note.id === id)
        if (note) {
          return note
        }
      }
    }).find((note => note))
  }

  /**
   * Delete the given NoteInfo from the index.
   * @param noteInfo
   */
  deleteNoteInfo(noteInfo: NoteInfo): void {
    for (let folder of this.folders) {
      for (let subfolder of folder) {
        if (subfolder.removeNote(noteInfo.id)) {
          return
        }
      }
    }
  }
}
