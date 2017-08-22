import { TestBed, inject } from '@angular/core/testing';

import { DataWorkerService } from './data-worker.service';

describe('DataWorkerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataWorkerService]
    });
  });

  it('should be created', inject([DataWorkerService], (service: DataWorkerService) => {
    expect(service).toBeTruthy();
  }));
});
