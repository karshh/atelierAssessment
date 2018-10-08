import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService/auth.service'
import { FormGroup, FormControl, Validators  } from '@angular/forms';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	username: FormControl;
	password: FormControl;

	constructor(private authService: AuthService) { 

		this.createFormControls();
		this.loginForm = new FormGroup({
			username: this.username,
			password: this.password
		});
	}

	ngOnInit() {}


	isLoginFailed():boolean {
		return this.authService.isLoginFailed();
	}

	isLoggedOut():boolean {
		return this.authService.isLoggedOut();
	}

	isLoggedIn():boolean {
		return this.authService.isLoggedIn();
	}

	isLoggingIn():boolean {
		return this.authService.isLoggingIn();
	}

	isPingSuccesful(): boolean {
		return this.authService.isPingSuccesful();
	}

	isPingFailed(): boolean {
		return this.authService.isPingFailed();
	}

	isPinging(): boolean {
		return this.authService.isPinging();
	}

	isServerError(): boolean {
		return this.authService.isServerError();
	}

	login() {
		this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
			(response) => console.log("Login succesful."),
			(error) => console.log("Login failed. Code = " + error.status)
		);
	}

	logout() {
		this.authService.logout();
	}

	ping() {
		this.authService.ping().subscribe(
			(response) => console.log("Ping succesful."),
			(error) => console.log("Ping failed.")
		);
	}

	private createFormControls(): void {
		this.username = new FormControl('', [Validators.required, Validators.email]);
		this.password = new FormControl('', Validators.required);
	}
}
