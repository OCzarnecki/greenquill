import {Folder} from './folder';
import {NoteInfo} from './note-info';

describe('Folder', () => {
  it('should create an instance', () => {
    expect(new Folder('name', [], [], () => undefined)).toBeTruthy();
  });

  it('should deserialize without children', function() {
    const folder = Folder.deserialize({name: 'folder-name', subFolders: [], notes: []}, () => undefined);
    expect(folder.name).toBe('folder-name');
    expect(folder.notes).toEqual([]);
    expect(folder.subFolders).toEqual([]);
  });

  it('should deserialize correctly with children', function() {
    const data = {
      name: 'root',
      subFolders: [
        {name: 'sub1', subFolders: [], notes: []},
        {name: 'sub2', subFolders: [], notes: []}
      ],
      notes: [
        {id: '1', title: 'Note One'},
        {id: '2', title: 'Note Two'},
      ]
    };

    const folder = Folder.deserialize(data, () => undefined);

    expect(folder.name).toBe('root');

    expect(folder.subFolders.length).toEqual(2);

    const sub1 = folder.subFolders.find(folder => folder.name == 'sub1');
    expect(sub1).toBeTruthy();
    expect(sub1.subFolders.length).toEqual(0);
    expect(sub1.notes.length).toEqual(0);

    const sub2 = folder.subFolders.find(folder => folder.name == 'sub2');
    expect(sub2).toBeTruthy();
    expect(sub2.subFolders.length).toEqual(0);
    expect(sub2.notes.length).toEqual(0);

    expect(folder.notes.length).toEqual(2);

    const note1 = folder.notes.find(note => note.id == '1');
    expect(note1.title).toEqual('Note One');

    const note2 = folder.notes.find(note => note.id == '2');
    expect(note2.title).toEqual('Note Two');
  });

  it('should iterate correctly: multiple levels', function() {
    const root = new Folder('(1)', [
      new Folder('(11)', [], []),
      new Folder('(12)', [
        new Folder('(121)', [], [])
      ], [], () => undefined)
    ], [], () => undefined);

    let names = [];
    for (let folder of root) {
      names.push(folder.name);
    }
    expect(names.length).toEqual(4);
    expect(names).toContain('(1)');
    expect(names).toContain('(11)');
    expect(names).toContain('(12)');
    expect(names).toContain('(121)');
  });

  it('should iterate correctly: no subfolders', function() {
    const root = new Folder('(1)', [], []);
    let names = [];
    for (let folder of root) {
      names.push(folder.name);
    }
    expect(names).toEqual(['(1)']);
  });

  it('should remove a note and return true', function() {
    let called = false;

    const folder = new Folder('folder', [], [
      new NoteInfo('note-id', 'title')
    ], () => called = true);

    expect(folder.notes.find(note => note.id === 'note-id')).toBeTruthy();
    expect(folder.removeNote('note-id')).toBeTrue();
    expect(called).toBeTrue();
    expect(folder.notes.find(note => note.id === 'note-id')).toBeFalsy();
  });

  it('should return false if a given note cannot be removed', function() {
    let called = false;
    expect(
      new Folder('folder', [], [], () => called = true
      ).removeNote('note-id')).toBeFalse();
    expect(called).toBeFalse();
  });

  it('should add notes and call the callback', function() {
    let called = false;

    const folder = new Folder('folder', [], [], () => called = true);
    const note = new NoteInfo('id', 'Note Title');

    folder.addNote(note);
    expect(folder.notes).toContain(note);
    expect(called).toBeTrue();
  });
});
