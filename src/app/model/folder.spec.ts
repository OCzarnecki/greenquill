import { Folder } from './folder';

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

    expect(folder.subFolders.length).toEqual(2)

    const sub1 = folder.subFolders.find(folder => folder.name == 'sub1');
    expect(sub1).toBeTruthy();
    expect(sub1.subFolders.length).toEqual(0);
    expect(sub1.notes.length).toEqual(0)

    const sub2 = folder.subFolders.find(folder => folder.name == 'sub2');
    expect(sub2).toBeTruthy();
    expect(sub2.subFolders.length).toEqual(0);
    expect(sub2.notes.length).toEqual(0)

    expect(folder.notes.length).toEqual(2)

    const note1 = folder.notes.find(note => note.id == '1');
    expect(note1.title).toEqual('Note One');

    const note2 = folder.notes.find(note => note.id == '2');
    expect(note2.title).toEqual('Note Two');
  });
});
