import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface UserDetails {
	_id: string;
	email: string;
	name: string;
	exp: number;
	iat: number;
}

interface TokenResponse {
 	token: string;
}

export interface TokenPayload {
	email: string;
	password: string;
	name?: string;
}

@Injectable()
export class AuthenticationService {

	private token: string;

	constructor(private http: HttpClient, private router: Router) { }

	private getToken(): string {
		if (!this.token) {
			this.token = localStorage.getItem("token");
		}
		return this.token;
	}
	
	private saveToken(token: string): void {
		localStorage.setItem("token", token);
		this.token = token;
	}
	
	public logout(): void {
		this.token = "";
		window.localStorage.removeItem("token");
		this.router.navigateByUrl("/");
	}

	public getUserDetails(): UserDetails {
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

	private request(
		method: "post"|"get", 
		type: "login"|"register"|"profile", 
		user?: TokenPayload
	): Observable<any> {
		let baseUrl;
		if (method === "post") {
			baseUrl = this.http.post(`/api/v1/${type}`, user);
		} else {
			baseUrl = this.http.get(`/api/v1/ ${type}`, { 
				headers: new HttpHeaders({ 
					Authorization: `Bearer ${this.getToken()}` 
				})
			});
		}
		const request = baseUrl.pipe(
			map((data: TokenResponse) => {
				if (data.token) {
					this.saveToken(data.token);
				}
				return data;
			})
		);
		return request;
	}

	public register(user: TokenPayload): Observable<any> {
		return this.request('post', 'register', user);
	}

	public login(user: TokenPayload): Observable<any> {
		return this.request('post', 'login', user);
	}

	public profile(): Observable<any> {
		return this.request('get', 'profile');
	}
}
