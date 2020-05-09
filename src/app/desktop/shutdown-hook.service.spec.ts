import { TestBed } from '@angular/core/testing';

import { ShutdownHookService } from './shutdown-hook.service';

describe('ShutdownHookService', () => {
  let service: ShutdownHookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShutdownHookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
