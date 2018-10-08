import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

enum LoginStatus {
	LoggedOut,
	LoggedIn,
	LoggingIn,
	LoginFailed,
	ServerError
};

enum PingStatus {
	Unpinged,
	Pinging,
	PingSuccesful,
	PingFailed
};

@Injectable({
	providedIn: 'root'
})


export class AuthService {

	private loginURL: string = 'https://id.pe.atelierclient.com/connect/token';
	private pingURL: string = 'https://pe.atelierclient.com/api/home/auth-ping';

	private loginStatus: LoginStatus;
	private pingStatus: PingStatus;

  	constructor(private http: HttpClient) {
  		this.pingStatus = PingStatus.Unpinged;
  		this.loginStatus = localStorage.getItem('token') == null ? LoginStatus.LoggedOut : LoginStatus.LoggedIn;
  	}

  	isLoginFailed():boolean {
  		return this.loginStatus == LoginStatus.LoginFailed;
  	}

  	isLoggedIn():boolean {
  		return this.loginStatus == LoginStatus.LoggedIn;
  	}

  	isLoggedOut():boolean {
  		return this.loginStatus == LoginStatus.LoggedOut;
  	}
  	
  	isLoggingIn():boolean {
  		return this.loginStatus == LoginStatus.LoggingIn;
  	}

  	isServerError(): boolean {
  		return this.loginStatus == LoginStatus.ServerError;
  	}

  	isPingSuccesful(): boolean {
  		return this.pingStatus == PingStatus.PingSuccesful;
  	}

  	isPingFailed(): boolean {
  		return this.pingStatus == PingStatus.PingFailed;
  	}

  	isPinging(): boolean {
  		return this.pingStatus == PingStatus.Pinging;
  	}

	login(username: string, password: string): Observable<boolean> {

    	let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');

		let bodyParams = new URLSearchParams();
		bodyParams.set('grant_type', 'password');
		bodyParams.set('username', username);
		bodyParams.set('password', password);
		bodyParams.set('scope', "offline_access openid profile");
		bodyParams.set('resource', 'api://enterprise');
		let body = bodyParams.toString();

		this.loginStatus = LoginStatus.LoggingIn;		
		return this.http.post<any>(this.loginURL, body, {"headers": headers})
			.pipe(map((response) => {
				localStorage.setItem('token', response.access_token);
				this.loginStatus = LoginStatus.LoggedIn;
				return response;
			}))
			.pipe(catchError((err) => {
				if (err.status == 400) this.loginStatus = LoginStatus.LoginFailed;
				else if (err.status >= 500) this.loginStatus = LoginStatus.ServerError;

				return throwError(err);
			}));
	}


	logout() {
		localStorage.removeItem('token');
		this.loginStatus = LoginStatus.LoggedOut;
		this.pingStatus = PingStatus.Unpinged;
	}

	ping(): Observable<boolean> {

		let token = localStorage.getItem('token');
		let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
		this.pingStatus = PingStatus.Pinging;
		return this.http.get<any>(this.pingURL, {"headers": headers})
		.pipe(map((response) => {
			this.pingStatus = PingStatus.PingSuccesful;
			return true;
		})).pipe(catchError((err) => {
			this.pingStatus = PingStatus.PingFailed;
			return throwError(err);
		}));
	}


}
