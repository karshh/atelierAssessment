import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientModule, HttpEvent } from '@angular/common/http'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientModule, HttpClientTestingModule ],
			providers: [ AuthService ]
		});
	});

	it('should be created', inject([AuthService], (service: AuthService) => {
		expect(service).toBeTruthy();
	}));

	// For now just send a boolean over to those subscribed to ping().
	it('Response will be true when ping() is succesful', inject([HttpTestingController, AuthService], (mockHttp: HttpTestingController ,service: AuthService) => {
		service.ping().subscribe(
			(response) => expect(response).toBe(true)
		);

		const req = mockHttp.expectOne('https://pe.atelierclient.com/api/home/auth-ping');
		expect(req.request.method).toEqual('GET');
		req.flush({});

	}));

	it('token is added to localstorage when login() is succesful', inject([HttpTestingController, AuthService], (mockHttp: HttpTestingController ,service: AuthService) => {
		service.login('test', 'test').subscribe(
			(response:any) => {
				expect(response.access_token).toBe('testToken')
				expect(localStorage.getItem('token')).toBe('testToken');
			}
		);

		const req = mockHttp.expectOne('https://id.pe.atelierclient.com/connect/token');
		expect(req.request.method).toEqual('POST');
		req.flush({'access_token': 'testToken'});
	}));
	

	it('token is removed from localstorage when logout() is called', inject([HttpTestingController, AuthService], (mockHttp: HttpTestingController ,service: AuthService) => {
		localStorage.setItem('token', 'testToken2');
		service.logout();
		expect(localStorage.getItem('token')).toBeNull();
	}));

	afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
	  	httpMock.verify();
		localStorage.removeItem('token');
	}));
});
