import { Folder } from './folder';
import {NoteInfo} from './note-info';

describe('Folder', () => {
  it('should create an instance', () => {
    expect(new Folder('name', [], [], void 0)).toBeTruthy();
  });

  it('should deserialize without children', function() {
    const folder = Folder.deserialize({name: 'folder-name', subFolders: [], notes: []}, void 0);
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

    const folder = Folder.deserialize(data, void 0);

    expect(folder.name).toBe('root');
    expect(folder.subFolders).toContain(new Folder('sub1', [], [], void 0));
    expect(folder.subFolders).toContain(new Folder('sub2', [], [], void 0));
    expect(folder.notes).toContain(new NoteInfo('1', 'Note One', void 0));
    expect(folder.notes).toContain(new NoteInfo('2', 'Note Two', void 0));
  });
});
