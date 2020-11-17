import { TestBed } from '@angular/core/testing';

import { FireCrudService } from './fire-crud.service';

describe('FireCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireCrudService = TestBed.get(FireCrudService);
    expect(service).toBeTruthy();
  });
});
