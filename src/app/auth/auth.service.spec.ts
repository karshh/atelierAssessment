import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ AuthService ]
    });
  });

  it('should be created', inject([HttpClient, AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
