import { TestBed, inject } from '@angular/core/testing';

import { PingStatusService } from './ping-status.service';

describe('PingStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PingStatusService]
    });
  });

  it('should be created', inject([PingStatusService], (service: PingStatusService) => {
    expect(service).toBeTruthy();
  }));
});
