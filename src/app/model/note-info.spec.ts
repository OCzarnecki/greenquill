import { NoteInfo } from './note-info';

describe('NoteInfo', () => {
  it('should create an instance', () => {
    expect(new NoteInfo('ID', 'Title', () => void 0)).toBeTruthy();
  });

  it('should deserialize correctly', function() {
    const noteInfo = NoteInfo.deserialize({id: 'ID', title: 'TITLE'}, () => void 0);
    expect(noteInfo.id).toEqual('ID');
    expect(noteInfo.title).toEqual('TITLE')
  });
});
