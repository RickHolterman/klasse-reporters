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

	public getGroups(): Observable<any> {
		return this.http.get('/api/v1/groups', this.authProvider.getHeaders());
	}

	public getGroup(group): Observable<any> {
		return this.http.get(`/api/v1/groups/${group}`, this.authProvider.getHeaders());
	}
}
