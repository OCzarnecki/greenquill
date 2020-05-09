import { TestBed } from '@angular/core/testing';

import { NotebookService } from './notebook.service';

describe('NotebookService', () => {
  let service: NotebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotebookService);
  });

  // TODO This fails because NotebookService depends on StorageService, which must be run from electron
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
