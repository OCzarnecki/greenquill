import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FolderNodeComponent} from './folder-node.component';
import {Folder} from '../../model/folder';
import {NoteInfo} from '../../model/note-info';
import {AppContextService} from '../../app-context.service';

describe('FolderNodeComponent', () => {
  let component: FolderNodeComponent;
  let fixture: ComponentFixture<FolderNodeComponent>;
  let appContextService: AppContextService;

  function findRoot() {
    return fixture.nativeElement.querySelector('.folder-entry');
  }

  function setFolder(folder: Folder): void {
    component.folder = folder;
    fixture.detectChanges();
  }

  function click(el): void {
    el.click();
    fixture.detectChanges();
  }

  function clickRootExpander(): void {
    click(findRoot().querySelector('#expander'));
  }

  beforeEach(async(() => {
    appContextService = new AppContextService();

    TestBed.configureTestingModule({
      declarations: [FolderNodeComponent],
      providers: [
        {provide: AppContextService, useValue: appContextService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the folder name', function() {
    setFolder(new Folder('The Folder Name', [], [], () => void 0));
    expect(findRoot().querySelector('#folder-name-label').textContent).toBe('The Folder Name');
  });

  it('should open/close when expander clicked', function() {
    setFolder(new Folder('name', [], [], () => void 0));
    expect(component.isOpen).toBe(false, 'closed initially');
    findRoot().querySelector('#expander').click();
    fixture.detectChanges();
    expect(component.isOpen).toBe(true, 'closed initially');
  });

  it('should display its contents iff open', function() {
    setFolder(new Folder('root', [new Folder('sub', [], [], () => void 0)], [new NoteInfo('ID-1234', 'note', () => void 0)], () => void 0));
    expect(findRoot().querySelector('.folder-entry')).toBeFalsy('No folder displayed initially');
    expect(findRoot().querySelector('.note-entry')).toBeFalsy('No note displayed initially');

    clickRootExpander();

    expect(
      fixture.nativeElement
        .querySelector('#folder-contents')
        .querySelector('#folder-name-label')
        .textContent
        .trim())
      .toEqual('sub', 'Sub-folder should be displayed');
    expect(
      fixture.nativeElement
        .querySelector('.note-entry')
        .textContent
        .trim())
      .toEqual('note', 'Contained note should be displayed');

    clickRootExpander();

    expect(findRoot().querySelector('.folder-entry')).toBeFalsy('The sub-folder should not be shown');
    expect(findRoot().querySelector('.note-entry')).toBeFalsy('The note should not be shown');
  });

  it('should modify the appContext when selected', () => {
    const folder = new Folder('name', [], [], () => void 0);
    setFolder(folder);

    findRoot().querySelector('#folder-name-label').click();
    fixture.detectChanges();

    expect(appContextService.selectedFolder).toEqual(folder);
  });
});
