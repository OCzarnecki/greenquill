import { NoteContent } from './note-content';

describe('NoteContent', () => {
  it('should create an instance', () => {
    expect(new NoteContent()).toBeTruthy();
  });

  it('should serialize correctly', function() {
    const nc = new NoteContent();
    nc.id = 'ID';
    nc.content = 'CONTENT';

    const result = nc.serialize();

    expect(result.id).toBe('ID');
    expect(result.content).toBe('CONTENT');
  });

  it('should deserialize correctly', function() {
    const data = {
      id: 'ID',
      content: 'CONTENT'
    };

    const result = NoteContent.deserialize(data);

    expect(result.id).toBe('ID');
    expect(result.content).toBe('CONTENT');
  });
});
