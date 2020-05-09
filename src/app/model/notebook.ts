import {Folder} from './folder';

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

  serialize() {
    return {
      'folders': this.folders.map(folder => folder.serialize())
    }
  }
}
