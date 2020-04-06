import { NoteInfo } from './note-info';

describe('NoteInfo', () => {
  it('should create an instance', () => {
    expect(new NoteInfo('ID', 'Title')).toBeTruthy();
  });

  it('should deserialize correctly', function() {
    expect(NoteInfo.deserialize({id: 'ID', title: 'TITLE'})).toEqual(new NoteInfo('ID', 'TITLE'));
  });
});
