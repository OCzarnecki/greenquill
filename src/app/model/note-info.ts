/**
 * Metadata about a note.
 */
export class NoteInfo {
  constructor(
    public id: string,
    public title: string) {
  }

  /**
   * Create a new NoteInfo from data.
   *
   * @param data The data to deserialize. Usually obtained by calling JSON.parse(...) on a string conforming to /doc/notebook-format.md.
   */
  static deserialize(data: any): NoteInfo {
    return new NoteInfo(
      data.id,
      data.title
    );
  }
}
