import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: '[class="app-login"]',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	credentials: TokenPayload = {
		email: "",
		password: ""
	};
	loginErrorMessage: string = null;
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
				console.log(err);
				this.loginErrorMessage = err.error.message;
			});
		}
	}

	isValid(field: string, error?: string): boolean {
		if (error) {
			if (error == 'required') {
				return this.form.controls[field].hasError(error) && this.submitted == true;
			} else if (error == 'email') {
				return this.form.controls[field].hasError(error) && this.submitted == true && !this.form.controls['email'].hasError('required');
			}
		} else {
			return !this.form.controls[field].valid && this.submitted == true;
		}
	}

	addErrorClassFor(field: string) {
		return { 'has-error': this.isValid(field) };
	}

	addErrorMessageClassFor(field: string, error: string) {
		return { 'error-message-show': this.isValid(field, error) };
	}
}
