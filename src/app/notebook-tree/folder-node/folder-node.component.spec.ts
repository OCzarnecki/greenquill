import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FolderNodeComponent} from './folder-node.component';
import {Folder} from '../../model/folder'
import {NoteInfo} from '../../model/note-info';

describe('FolderNodeComponent', () => {
  let component: FolderNodeComponent;
  let fixture: ComponentFixture<FolderNodeComponent>;

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

  function clickRoot(): void {
    click(findRoot());
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FolderNodeComponent]
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
    setFolder(new Folder('The Folder Name', [], [], void 0));
    expect(findRoot().querySelector('span').textContent).toBe('The Folder Name');
  });

  it('should open/close when clicked', function() {
    setFolder(new Folder('name', [], [], void 0));
    expect(component.isOpen).toBe(false, 'closed initially');
    findRoot().click();
    fixture.detectChanges();
    expect(component.isOpen).toBe(true, 'closed initially');
  });

  it('should display its contents iff open', function() {
    setFolder(new Folder(
      'root',
      [new Folder('sub', [], [], void 0)],
      [new NoteInfo('ID-1234', 'note', void 0)],
      void 0
    ));
    expect(findRoot().querySelector('.folder-entry')).toBeFalsy('No folder displayed initially');
    expect(findRoot().querySelector('.note-entry')).toBeFalsy('No note displayed initially');

    clickRoot();

    expect(
      fixture.nativeElement
        .querySelector('.folder-entry + div')
        .querySelector('span')
        .textContent
        .trim())
      .toEqual('sub', 'Sub-folder should be displayed');
    expect(
      fixture.nativeElement
        .querySelector('.note-entry')
        .textContent
        .trim())
      .toEqual('note', 'Contained note should be displayed');

    clickRoot();

    expect(findRoot().querySelector('.folder-entry')).toBeFalsy('The sub-folder should not be shown');
    expect(findRoot().querySelector('.note-entry')).toBeFalsy('The note should not be shown');
  });
});
