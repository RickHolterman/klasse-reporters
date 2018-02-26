import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: '[class="app-nav"]',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

	constructor(public auth: AuthenticationService) { }

	ngOnInit() {
	}
}
