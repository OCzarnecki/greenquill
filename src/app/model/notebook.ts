import {Folder} from './folder';
import {NoteInfo} from './note-info';

/**
 * The notebook index, containing folder structure, ID -> title mapping, and metadata.
 */
export class Notebook {
  // public readonly dirty: BehaviorSubject<boolean>

  private readonly _folders: Folder[];
  public get folders(): Readonly<Folder[]> {
    return this._folders;
  }

  constructor(
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
    // Just simple tree traversal, i.e. O(|notes| + |folders|)
    for (let folder of this.folders) {
      const result = this.findNoteWithIdInFolder(id, folder);
      if (result) {
        return result;
      }
    }
    return void 0;
  }

  private findNoteWithIdInFolder(id: string, folder: Folder): NoteInfo {
    for (let note of folder.notes) {
      if (note.id == id) {
        return note;
      }
    }

    for (let sub of folder.subFolders) {
      const result = this.findNoteWithIdInFolder(id, sub);
      if (result) {
        return result
      }
    }

    return void 0;
  }
}
