import {NoteInfo} from './note-info';

/**
 * A notebook folder, containing sub-folders and notes.
 */
export class Folder {
  /**
   * @return folder name, for display
   */
  public get name(): string {
    return this._name;
  }

  /**
   * @return unmodifiable list of subfolders
   */
  public get subFolders(): readonly Folder[] {
    return this._subFolders;
  }

  /**
   * @return unmodifiable list of notes
   */
  public get notes(): readonly NoteInfo[] {
    return this._notes;
  }

  /**
   * Constructor.
   *
   * @param _name the folder name for display
   * @param _subFolders list of sub folders
   * @param _notes list of notes
   * @param _changeCallback callback to be invoked whenever this folder changes
   */
  constructor(
    private _name: string,
    private _subFolders: Folder[],
    private _notes: NoteInfo[],
    private _changeCallback: () => void
  ) {
  }

  /**
   * Create a new folder from data.
   *
   * @param data The data to deserialize. Usually obtained by calling JSON.parse(...) on a string conforming to /doc/notebook-format.md.
   * @param changeCallback Function to be called whenever the Folder changes
   */
  static deserialize(data: any, changeCallback: () => void): Folder {
    return new Folder(
      data.name,
      data.subFolders.map(data => Folder.deserialize(data, changeCallback)),
      data.notes.map(data => NoteInfo.deserialize(data, changeCallback)),
      changeCallback
    );
  }

  serialize() {
    return {
      'name': this.name,
      'subFolders': this.subFolders.map(subFolder => subFolder.serialize()),
      'notes': this.notes.map(note => note.serialize())
    };
  }

  public addNote(noteInfo: NoteInfo) {
    this._notes.push(noteInfo);
    this._changeCallback();
  }
}
