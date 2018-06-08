import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

interface TokenResponse {
 	token: string;
}

@Injectable()
export class AuthenticationService {

	private token: string;

	constructor(private http: HttpClient, private router: Router) { }

	private setToken(token: string): void {
		localStorage.setItem("token", token);
		this.token = token;
	}

	public getToken(): string {
		if (!this.token) {
			this.token = localStorage.getItem("token");
		}
		return this.token;
	}

	public getHeaders() { 
		return {
			headers: new HttpHeaders({ 
				Authorization: `Bearer ${this.getToken()}` 
			})
		}
	}

	public register(user): Observable<any> {
		return this.http.post('/api/v1/register', user).pipe(
	    	map((data: TokenResponse) => {
		        if (data.token) {
		          	this.setToken(data.token);
		        }
	        	return data;
	      	})
	    );
	}	

	public login(user): Observable<any> {
		return this.http.post('/api/v1/login', user).pipe(
	    	map((data: TokenResponse) => {
		        if (data.token) {
		          	this.setToken(data.token);
				}
	        	return data;
	      	})
	    );
	}

	public getUserDetails() {
		const token = this.getToken();
		let payload;
		if (token) {
			payload = token.split('.')[1];
			payload = window.atob(payload);
			return JSON.parse(payload);
		} else {
			return null;
		}
	}

	public isLoggedIn(): boolean {
		const user = this.getUserDetails();
		if (user) {
			return user.exp > Date.now() / 1000;
		} else {
			return false;
		}
	}

	public logout(): void {
		this.token = "";
		window.localStorage.removeItem("token");
		this.router.navigateByUrl("/login");
	}
}
