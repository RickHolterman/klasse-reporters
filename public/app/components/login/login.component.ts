import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: '[class="app-login"]',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	credentials: any = new Object();
	emailErrorServer: boolean = false;
	passwordErrorServer: boolean = false;
	emailErrorServerMessage: string = null;
	passwordErrorServerMessage: string = null;
	errorMessageEmail: string = null;
	errorMessagePassword: string = null;
	submitted: boolean = false;

	constructor(
		private auth: AuthenticationService, 
		private router: Router, 
		formBuilder: FormBuilder
	) {
		this.form = formBuilder.group({
			email: [null, Validators.compose([
				Validators.required,
				Validators.email]
			)],
			password: [null, Validators.compose([
				Validators.required]
			)]
		});
	}

	ngOnInit() {
	}

	login(value: any) {
		
		this.submitted = true;
		if (this.form.valid) {
			this.credentials.email = this.form.controls['email'].value;
			this.credentials.password = this.form.controls['password'].value;
			this.auth.login(this.credentials).subscribe(() => {
				this.router.navigateByUrl('/profile');
			}, (err) => {

				if (err.error.errorField == 'email') {
					this.emailErrorServer = true;
					this.emailErrorServerMessage = err.error.message;
				} else {
					this.emailErrorServer = false;
				}
				if (err.error.errorField == 'password') {
					this.passwordErrorServer = true;
					this.passwordErrorServerMessage = err.error.message;
				} else {
					this.passwordErrorServer = false;
				}
			});
		}
	}

	isValid(field: string): boolean {

		if (this.submitted) {
			if (field == 'email') {
				if (this.form.controls[field].hasError('required') || this.form.controls[field].hasError('email') || this.emailErrorServer) {
					return true;
				} else if (this.form.controls[field].valid && this.emailErrorServer == false) {
					return false;
				}
			}
			if (field == 'password') {
				if (this.form.controls[field].hasError('required') || this.passwordErrorServer) {
					return true;
				} else if (this.form.controls[field].valid && this.passwordErrorServer == false) {
					return false;
				}
			}				
		}
	}

	setErrorMessages(field: string): void {

		if (this.submitted) {
			if (field == 'email') {
				if (this.form.controls[field].hasError('required')) {
					this.errorMessageEmail = "Vul je e-mailadres in.";
				} else if (this.form.controls['email'].hasError('email')) {
					this.errorMessageEmail = "Dit e-mailadres lijkt niet te kloppen.";
				} else if (this.emailErrorServer) {
					this.errorMessageEmail = this.emailErrorServerMessage;
				} else if (this.form.controls[field].valid && this.emailErrorServer == false) {
					this.errorMessageEmail = null;
				}
			}
			if (field == 'password') {
				if (this.form.controls[field].hasError('required')) {
					this.errorMessagePassword = "Vul je wachtwoord in.";
				} else if (this.passwordErrorServer) {
					this.errorMessagePassword = this.passwordErrorServerMessage;
				} else if (this.form.controls[field].valid && this.passwordErrorServer == false) {
					this.errorMessagePassword = null;
				}
			}				
		}
	}

	addErrorClassFor(field: string) {
		this.setErrorMessages(field);
		return { 'has-error': this.isValid(field) };
	}

	addErrorMessageClassFor(field: string) {
		return { 'error-message-show': this.isValid(field) };
	}
}
