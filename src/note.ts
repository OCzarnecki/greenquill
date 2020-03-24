export class Note {
  content: string;

  static deserialize(content: string): Note {
    const ret = new Note();
    ret.content = content;
    return ret;
  }

  serialize() {
    return this.content;
  }
}
