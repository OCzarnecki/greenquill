import { NoteInfo } from './note-info';

describe('NoteInfo', () => {
  it('should create an instance', () => {
    expect(new NoteInfo('ID', 'Title', void 0)).toBeTruthy();
  });

  it('should deserialize correctly', function() {
    expect(NoteInfo.deserialize({id: 'ID', title: 'TITLE'}, void 0)).toEqual(new NoteInfo('ID', 'TITLE', void 0));
  });
});
