import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ProfileService {

	constructor(
		private http: HttpClient,
		public authProvider: AuthenticationService
	) { }

	public getProfile(user): Observable<any> {
		return this.http.get(`/api/v1/profile/${user}`, this.authProvider.getHeaders());
	}
}
