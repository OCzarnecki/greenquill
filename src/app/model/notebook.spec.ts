import { Notebook } from './notebook';
import {Folder} from './folder';

describe('Notebook', () => {
  it('should create an instance', () => {
    expect(new Notebook([])).toBeTruthy();
  });

  it('should deserialize correctly', function() {
    const expected = new Notebook([new Folder('f1', [], []), new Folder('f2', [], [])]);
    expect(Notebook.deserialize({
      folders: [
        {name: 'f1', subFolders: [], notes: []},
        {name: 'f2', subFolders: [], notes: []}
      ]
    })).toEqual(expected)
  });
});
