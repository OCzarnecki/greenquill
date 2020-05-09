/**
 * Metadata about a note.
 */
export class NoteInfo {
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  constructor(
    private _id: string,
    private _title: string,
    private _changeCallback: () => void) {
  }

  /**
   * Create a new NoteInfo from data.
   *
   * @param data The data to deserialize. Usually obtained by calling JSON.parse(...) on a string conforming to /doc/notebook-format.md.
   * @param changeCallback Function to be called whenever this NoteInfo changes
   */
  static deserialize(data: any, changeCallback: () => void): NoteInfo {
    return new NoteInfo(
      data.id,
      data.title,
      changeCallback
    );
  }

  serialize() {
    return {
      'id': this.id,
      'title': this.title
    };
  }
}
