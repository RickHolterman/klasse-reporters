import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class GroupService {

	constructor(
		private http: HttpClient,
		public authProvider: AuthenticationService
	) { }

	public getGroup(group): Observable<any> {
		return this.http.get(`/api/v1/group/${group}`, this.authProvider.getHeaders());
	}
}
