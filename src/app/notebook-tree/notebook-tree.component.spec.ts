import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Folder} from '../model/folder';
import {StorageServiceStub} from '../testing/storage-service-stub';
import {NotebookTreeComponent} from './notebook-tree.component';
import {Notebook} from '../model/notebook';
import {StorageService} from '../desktop/storage.service';
import {NotebookService} from '../notebook.service';

describe('NotebookTreeComponent', () => {
  let fixture: ComponentFixture<NotebookTreeComponent>;
  let component: NotebookTreeComponent;
  let storage = new StorageServiceStub();
  const folders = [new Folder('root', [], [], () => void 0)];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotebookTreeComponent],
      providers: [
        NotebookService,
        {provide: StorageService, useValue: storage}
      ]
    })
      .compileComponents();

    storage.notebook = new Notebook(folders);
    TestBed.inject(NotebookService).init();

    fixture = TestBed.createComponent(NotebookTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loaded its data from the StorageService after init', () => {
    // TODO this is more of a test for NotebookService
    expect(component.notebookService.notebook.folders).toEqual(folders);
  });
});
