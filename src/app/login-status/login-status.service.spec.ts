import { TestBed, inject } from '@angular/core/testing';
import { LoginStatusService } from './login-status.service';

describe('LoginStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginStatusService]
    });
  });

  it('should be created', inject([LoginStatusService], (service: LoginStatusService) => {
    expect(service).toBeTruthy();
  }));

  it('login status should be instantiated as logged out within the scope of this test.', inject([LoginStatusService], (service: LoginStatusService) => {
  	expect(service.isLoggedOut()).toBe(true);
  	expect(service.isLoggedIn()).toBe(false);
  	expect(service.isLoggingIn()).toBe(false);
  	expect(service.isLoginFailed()).toBe(false);
  	expect(service.isServerError()).toBe(false);
  }));

  it('login status should be logging in when called setLoggingIn().', inject([LoginStatusService], (service: LoginStatusService) => {
  	service.setLoggingIn();
  	expect(service.isLoggedOut()).toBe(false);
  	expect(service.isLoggedIn()).toBe(false);
  	expect(service.isLoggingIn()).toBe(true);
  	expect(service.isLoginFailed()).toBe(false);
  	expect(service.isServerError()).toBe(false);
  }));

  it('login status should be logged in when called setLoggedIn().', inject([LoginStatusService], (service: LoginStatusService) => {
  	service.setLoggedIn();
  	expect(service.isLoggedOut()).toBe(false);
  	expect(service.isLoggedIn()).toBe(true);
  	expect(service.isLoggingIn()).toBe(false);
  	expect(service.isLoginFailed()).toBe(false);
  	expect(service.isServerError()).toBe(false);
  }));

  it('login status should be logged out when called setLoggedOut().', inject([LoginStatusService], (service: LoginStatusService) => {
  	service.setLoggedOut();
  	expect(service.isLoggedOut()).toBe(true);
  	expect(service.isLoggedIn()).toBe(false);
  	expect(service.isLoggingIn()).toBe(false);
  	expect(service.isLoginFailed()).toBe(false);
  	expect(service.isServerError()).toBe(false);
  }));

  it('login status should be login failed in when called setLoginFailed().', inject([LoginStatusService], (service: LoginStatusService) => {
  	service.setLoginFailed();
  	expect(service.isLoggedOut()).toBe(false);
  	expect(service.isLoggedIn()).toBe(false);
  	expect(service.isLoggingIn()).toBe(false);
  	expect(service.isLoginFailed()).toBe(true);
  	expect(service.isServerError()).toBe(false);
  }));

  it('login status should be server error in when called setServerError().', inject([LoginStatusService], (service: LoginStatusService) => {
  	service.setServerError();
  	expect(service.isLoggedOut()).toBe(false);
  	expect(service.isLoggedIn()).toBe(false);
  	expect(service.isLoggingIn()).toBe(false);
  	expect(service.isLoginFailed()).toBe(false);
  	expect(service.isServerError()).toBe(true);
  }));
});
