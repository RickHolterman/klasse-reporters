import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ThemeService {

	constructor(
		private http: HttpClient,
		public authProvider: AuthenticationService
	) { }

	public getTheme(theme): Observable<any> {
		return this.http.get(`api/v1/themes/${theme}`, this.authProvider.getHeaders());
	}
}
