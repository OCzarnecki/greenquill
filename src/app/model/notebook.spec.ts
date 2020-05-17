import {Notebook} from './notebook';
import {Folder} from './folder';
import {NoteInfo} from './note-info';

describe('Notebook', () => {
  it('should create an instance', () => {
    expect(new Notebook([])).toBeTruthy();
  });

  it('should deserialize correctly', function() {
    const actual = Notebook.deserialize({
        folders: [
          {name: 'f1', subFolders: [], notes: []},
          {name: 'f2', subFolders: [], notes: []}
        ]
      },
      () => void 0);
    expect(actual.folders.length).toEqual(2);
    expect(actual.folders.find(folder => folder.name == 'f1')).toBeTruthy();
    expect(actual.folders.find(folder => folder.name == 'f2')).toBeTruthy();
    expect(actual.folders[0].subFolders.length).toEqual(0);
    expect(actual.folders[0].notes.length).toEqual(0);
    expect(actual.folders[1].subFolders.length).toEqual(0);
    expect(actual.folders[1].notes.length).toEqual(0);
  });

  it('should find the correct note', function() {
    const notebook = new Notebook([
      new Folder('folder', [
        new Folder('subfolder', [], [
          new NoteInfo('id', 'title'),
          new NoteInfo('wrong1', 'strange title')]
        )
      ], [new NoteInfo('wrong2', 'another title')])
    ]);

    const found = notebook.findNoteWithId('id');
    expect(found.id).toEqual('id');
    expect(found.title).toEqual('title');
  });

  it('should return something falsy if a note cannot be found', function() {
    const notebook = new Notebook([
      new Folder('folder', [
        new Folder('subfolder', [], [
          new NoteInfo('id', 'title'),
          new NoteInfo('wrong1', 'strange title')]
        )
      ], [new NoteInfo('wrong2', 'another title')])
    ]);

    const found = notebook.findNoteWithId('invalid-id');
    expect(found).toBeFalsy()
  });
});
