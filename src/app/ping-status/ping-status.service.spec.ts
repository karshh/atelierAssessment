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

  it('\'s pingstatus should be set to Unpinged upon creation.', inject([PingStatusService], (service: PingStatusService) => {
    expect(service.isUnpinged()).toBe(true);
    expect(service.isPinging()).toBe(false);
    expect(service.isPingFailed()).toBe(false);
    expect(service.isPingSuccesful()).toBe(false);
  }));

  it('\'s pingstatus should be set to Pinging after calling setPinging.', inject([PingStatusService], (service: PingStatusService) => {
    service.setPinging();
    expect(service.isUnpinged()).toBe(false);
    expect(service.isPinging()).toBe(true);
    expect(service.isPingFailed()).toBe(false);
    expect(service.isPingSuccesful()).toBe(false);

  }));
  
  it('\'s pingstatus should be set to PingSuccesful after calling setPingSuccesful.', inject([PingStatusService], (service: PingStatusService) => {
    service.setPingSuccesful();
    expect(service.isUnpinged()).toBe(false);
    expect(service.isPinging()).toBe(false);
    expect(service.isPingFailed()).toBe(false);
    expect(service.isPingSuccesful()).toBe(true);

  }));
  
  it('\'s pingstatus should be set to PingFailed after calling setPingFailed.', inject([PingStatusService], (service: PingStatusService) => {
    service.setPingFailed();
    expect(service.isUnpinged()).toBe(false);
    expect(service.isPinging()).toBe(false);
    expect(service.isPingFailed()).toBe(true);
    expect(service.isPingSuccesful()).toBe(false);

  }));
  
  it('\'s pingstatus should be set to Unpinged after calling setUnpinged.', inject([PingStatusService], (service: PingStatusService) => {
    service.setUnpinged();
    expect(service.isUnpinged()).toBe(true);
    expect(service.isPinging()).toBe(false);
    expect(service.isPingFailed()).toBe(false);
    expect(service.isPingSuccesful()).toBe(false);

  }));
  
});
