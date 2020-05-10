import {Notebook} from './notebook';

describe('Notebook', () => {
  it('should create an instance', () => {
    expect(new Notebook([])).toBeTruthy();
  });

  it('should deserialize correctly', function() {
    // const expected = new Notebook([new Folder('f1', [], [], () => void 0), new Folder('f2', [], [], () => void 0)]);
    const actual = Notebook.deserialize({
        folders: [
          {name: 'f1', subFolders: [], notes: []},
          {name: 'f2', subFolders: [], notes: []}
        ]
      },
      () => void 0)
    expect(actual.folders.length).toEqual(2)
    expect(actual.folders.find(folder => folder.name == 'f1')).toBeTruthy()
    expect(actual.folders.find(folder => folder.name == 'f2')).toBeTruthy()
    expect(actual.folders[0].subFolders.length).toEqual(0)
    expect(actual.folders[0].notes.length).toEqual(0)
    expect(actual.folders[1].subFolders.length).toEqual(0)
    expect(actual.folders[1].notes.length).toEqual(0)
  });
});
