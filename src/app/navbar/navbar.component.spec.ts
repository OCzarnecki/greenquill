import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {StorageServiceStub} from '../testing/storage-service-stub';
import {StorageService} from '../desktop/storage.service';
import {AppContextService} from '../app-context.service';
import {Folder} from '../model/folder';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let storage: StorageServiceStub;
  let appContext: AppContextService

  beforeEach(async(() => {
    storage = new StorageServiceStub()
    appContext = new AppContextService()

    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        {provide: StorageService, useValue: storage},
        {provide: AppContextService, useValue: appContext}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the add note popup on click', () => {
    fixture.nativeElement.querySelector('nav > button').click();
    expect(fixture.nativeElement.querySelector('#popup-new-note').hidden).toBeFalse()
  })

  it('should add the new note in the default folder and close popup when done', () => {
    const folder = new Folder('folder', [], [], () => undefined)
    appContext.selectedFolder = folder;

    component.openAddNotePopup()
    component.newNoteName = 'NAME'
    fixture.nativeElement.querySelector('#popup-new-note > #content > button').click()

    expect(fixture.nativeElement.querySelector('#popup-new-note').hidden).toBeTrue()

    const note = folder.notes.find((noteInfo) => noteInfo.title == 'NAME');
    expect(note).toBeTruthy()
  })
});
