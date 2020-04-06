import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {EditorComponent} from './editor.component';
import {StorageServiceStub} from '../testing/storage-service-stub';
import {NoteContent} from '../..';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../testing/activated-route-stub';
import {StorageService} from '../desktop/storage.service';
import {FormsModule} from '@angular/forms';

describe('EditorComponentComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let storage: StorageServiceStub;
  let noteContent: NoteContent;
  const ID = '123';
  const CONTENT = 'Note Content';

  beforeEach(async(() => {
    storage = new StorageServiceStub();
    noteContent = new NoteContent();
    noteContent.id = ID;
    noteContent.content = CONTENT;
    storage.noteContent = noteContent;

    let route = new ActivatedRouteStub({'id': ID});

    TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [FormsModule],
      providers: [
        {provide: StorageService, useValue: storage},
        {provide: ActivatedRoute, useValue: route}
      ]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();  // notice that active route has changed
    tick();                   // resolve NoteContent promise
    fixture.detectChanges();  // update DOM using new contents
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the note id', ()  => {
    expect(fixture.nativeElement.querySelector('div > label').textContent)
      .toContain(ID);
  });

  it('should display the note content', function() {
    expect(fixture.nativeElement.querySelector('div > textarea').value)
      .toBe(CONTENT);
  });
});
