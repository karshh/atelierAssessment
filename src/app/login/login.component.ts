import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PingStatusService } from '../ping-status/ping-status.service';
import { LoginStatusService } from '../login-status/login-status.service';
import { FormsModule, ReactiveFormsModule,FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	username: FormControl;
	password: FormControl;

	constructor(private authService: AuthService, 
				private loginStatusService: LoginStatusService,
				private pingStatusService: PingStatusService) { 

		this.createFormControls();
		this.loginForm = new FormGroup({
			username: this.username,
			password: this.password
		});
	}

	ngOnInit() {}


	public isLoginFailed():boolean {
		return this.loginStatusService.isLoginFailed();
	}

	public isLoggedOut():boolean {
		return this.loginStatusService.isLoggedOut();
	}

	public isLoggedIn():boolean {
		return this.loginStatusService.isLoggedIn();
	}

	public isLoggingIn():boolean {
		return this.loginStatusService.isLoggingIn();
	}

	public isServerError(): boolean {
		return this.loginStatusService.isServerError();
	}

	public isPingSuccesful(): boolean {
		return this.pingStatusService.isPingSuccesful();
	}

	public isPingFailed(): boolean {
		return this.pingStatusService.isPingFailed();
	}

	public isPinging(): boolean {
		return this.pingStatusService.isPinging();
	}

	public login() {
		this.loginStatusService.setLoggingIn();
		this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
			(response) => this.loginStatusService.setLoggedIn(),
			(error) => {
				if (error.status == 400) this.loginStatusService.setLoginFailed();
				else this.loginStatusService.setServerError();
			}
		);
	}

	public logout() {
		this.authService.logout();
		this.loginStatusService.setLoggedOut();
		this.pingStatusService.setUnpinged();
	}

	public ping() {
		this.pingStatusService.setPinging();
		this.authService.ping().subscribe(
			(response) => this.pingStatusService.setPingSuccesful(),
			(error) => this.pingStatusService.setPingFailed()
		);
	}

	private createFormControls(): void {
		this.username = new FormControl('', [Validators.required, Validators.email]);
		this.password = new FormControl('', Validators.required);
	}
}
