import { Injectable } from '@angular/core';

enum LoginStatus {
	LoggedOut,
	LoggedIn,
	LoggingIn,
	LoginFailed,
	ServerError
};

@Injectable({
	providedIn: 'root'
})
export class LoginStatusService {

	private loginStatus: LoginStatus;

	constructor() { 
		if (localStorage.getItem('token')) {
			this.setLoggedIn();
		}
		else {
			this.setLoggedOut();
		} 
	}


	public isLoginFailed():boolean {
		return this.loginStatus == LoginStatus.LoginFailed;
	}

	public setLoginFailed(): void {
		this.loginStatus = LoginStatus.LoginFailed;
	}

	public isLoggedIn():boolean {
		return this.loginStatus == LoginStatus.LoggedIn;
	}

	public setLoggingIn(): void {
		this.loginStatus = LoginStatus.LoggingIn;
	}

	public isLoggedOut():boolean {
		return this.loginStatus == LoginStatus.LoggedOut;
	}

	public setLoggedOut(): void {
		this.loginStatus = LoginStatus.LoggedOut;
	}

	public isLoggingIn():boolean {
		return this.loginStatus == LoginStatus.LoggingIn;
	}

	public setLoggedIn(): void {
		this.loginStatus = LoginStatus.LoggedIn;
	}

	public isServerError(): boolean {
		return this.loginStatus == LoginStatus.ServerError;
	}

	public setServerError(): void {
		this.loginStatus = LoginStatus.ServerError;
	}

}
