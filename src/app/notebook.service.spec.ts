import {TestBed} from '@angular/core/testing';

import {NotebookService} from './notebook.service';
import {StorageService} from './desktop/storage.service';
import {StorageServiceStub} from './testing/storage-service-stub';
import {Notebook} from './model/notebook';
import {Folder} from './model/folder';
import {NoteInfo} from './model/note-info';

describe('NotebookService', () => {
  function configureWithNotebook(notebook: Notebook): NotebookService {
    let storage: StorageServiceStub;
    storage = new StorageServiceStub();
    storage.notebook = notebook;

    TestBed.configureTestingModule({
      providers: [
        NotebookService,
        {provide: StorageService, useValue: storage}
      ]
    });
    const notebookService = TestBed.inject(NotebookService);
    notebookService.init();
    return notebookService;
  }

  beforeEach(() => {

  });

  it('should be created', () => {
    const notebookService = configureWithNotebook(new Notebook([]));
    expect(notebookService).toBeTruthy();
  });

  it('should load the notebook from storage', function() {
    const notebook = new Notebook(
      [new Folder('folder', [], [new NoteInfo('id', 'some note')])]);

    const notebookService = configureWithNotebook(notebook);
    expect(notebookService.notebook).toEqual(notebook);
  });
});
