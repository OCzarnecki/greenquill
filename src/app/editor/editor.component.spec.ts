import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {EditorComponent} from './editor.component';
import {StorageServiceStub} from '../testing/storage-service-stub';
import {NoteContent} from '../..';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../testing/activated-route-stub';
import {StorageService} from '../desktop/storage.service';
import {FormsModule} from '@angular/forms';
import {NotebookService} from '../notebook.service';
import {Notebook} from '../model/notebook';
import {Folder} from '../model/folder';
import {NoteInfo} from '../model/note-info';

describe('EditorComponentComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let storage: StorageServiceStub;
  let noteContent: NoteContent;
  let notebook: Notebook;
  const ID = '123';
  const TITLE = 'Note Title';
  const CONTENT = 'Note Content';

  beforeEach(async(() => {
    storage = new StorageServiceStub();
    noteContent = new NoteContent();
    noteContent.id = ID;
    noteContent.content = CONTENT;
    storage.noteContent = noteContent;

    notebook = new Notebook(
      [
        new Folder('folder', [], [
          new NoteInfo(ID, TITLE, () => void 0)
        ], () => void 0)
      ]
    );
    storage.notebook = notebook;

    let route = new ActivatedRouteStub({'id': ID});

    TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [FormsModule],
      providers: [
        NotebookService,
        {provide: StorageService, useValue: storage},
        {provide: ActivatedRoute, useValue: route}
      ]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    const notebookService = TestBed.inject(NotebookService);
    notebookService.init();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();  // notice that active route has changed
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the note id', () => {
    expect(fixture.nativeElement.querySelector('#note-title-label').textContent)
      .toEqual(TITLE);
  });

  it('should display the note content', function() {
    expect(fixture.nativeElement.querySelector('div > textarea').value)
      .toBe(CONTENT);
  });
});
