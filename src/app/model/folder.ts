import {NoteInfo} from './note-info';

/**
 * A notebook folder, containing sub-folders and notes.
 */
export class Folder {
  constructor(
    public name: string,
    public subFolders: Folder[],
    public notes: NoteInfo[]
  ) {
  }

  /**
   * Create a new folder from data.
   *
   * @param data The data to deserialize. Usually obtained by calling JSON.parse(...) on a string conforming to /doc/notebook-format.md.
   */
  static deserialize(data: any): Folder {
    return new Folder(
      data.name,
      data.subFolders.map(Folder.deserialize),
      data.notes.map(NoteInfo.deserialize)
    );
  }
}
