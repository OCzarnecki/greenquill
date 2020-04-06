import {Folder} from './folder';

/**
 * The notebook index, containing folder structure, ID -> title mapping, and metadata.
 */
export class Notebook {
  constructor(
    public folders: Folder[]
  ) {
  }

  /**
   * Create Notebook from JSON data.
   *
   * @param value the data.
   */
  static deserialize(value: any): Notebook {
    return new Notebook(value.folders.map(folderData => Folder.deserialize(folderData)));
  }
}
