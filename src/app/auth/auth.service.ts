import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})


export class AuthService {

	private loginURL: string = 'https://id.pe.atelierclient.com/connect/token';
	private pingURL: string = 'https://pe.atelierclient.com/api/home/auth-ping';

  	constructor(private http: HttpClient) {
  	}

	public login(username: string, password: string): Observable<boolean> {

    	let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');

		let bodyParams = new URLSearchParams();
		bodyParams.set('grant_type', 'password');
		bodyParams.set('username', username);
		bodyParams.set('password', password);
		bodyParams.set('scope', "offline_access openid profile");
		bodyParams.set('resource', 'api://enterprise');
		let body = bodyParams.toString();
	
		return this.http.post<any>(this.loginURL, body, {"headers": headers})
			.pipe(map((response) => {
				localStorage.setItem('token', response.access_token);
				return response;
			}))
			.pipe(catchError((err) => {
				return throwError(err);
			}));
	}

	public logout() {
		localStorage.removeItem('token');
	}

	public ping(): Observable<boolean> {

		let token = localStorage.getItem('token');
		let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
		return this.http.get<any>(this.pingURL, {"headers": headers})
		.pipe(map((response) => {
			return true;
		})).pipe(catchError((err) => {
			return throwError(err);
		}));
	}
}
