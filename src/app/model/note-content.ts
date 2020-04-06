/**
 * Model class for the data (eg. text) associated with a note.
 */
export class NoteContent {
  /**
   * Unique id of the note.
   */
  id: string;

  /**
   * The note's text content.
   */
  content: string;

  /**
   * Create a new NoteContent from data.
   *
   * @param data The data to deserialize. Usually obtained by calling JSON.parse(...) on a string conforming to /doc/notebook-format.md.
   */
  static deserialize(data: any): NoteContent {
    const ret = new NoteContent();
    ret.content = data.content;
    ret.id = data.id;
    return ret;
  }

  /**
   * Write this object to a javascript object O, so that JSON.stringify(O) will conform to /doc/notebook-format.md.
   */
  serialize(): any {
    return {
      'id': this.id,
      'content': this.content
    };
  }
}
