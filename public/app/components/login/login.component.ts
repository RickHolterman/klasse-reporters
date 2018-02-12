import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: '[class="app-login"]',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	credentials: TokenPayload = {
		email: "",
		password: ""
	};

	constructor(private auth: AuthenticationService, private router: Router) { }

	ngOnInit() {
	}

	login() {
		this.auth.login(this.credentials).subscribe(() => {
			this.router.navigateByUrl('/profile');
		}, (err) => {
			console.error(err);
		});
	}

}
