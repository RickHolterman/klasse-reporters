import { Component, OnInit } from '@angular/core';

@Component({
	selector: '[class="app-header"]',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	visibility = "nav-hide";

	hideNav() {
		this.visibility = "nav-hide";
	}

	showNav() {
		this.visibility = "nav-show";
	}

	showOrHideNav() {
		if (this.visibility == "nav-show") {
			this.hideNav();
		} else {
			this.showNav()
		}
	}
}
