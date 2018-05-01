import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-theme',
	templateUrl: './theme.component.html',
	styleUrls: ['./theme.component.scss']
})

export class ThemeComponent implements OnInit {

	private theme: any;

	constructor(
		public auth: AuthenticationService, 
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			// Retrieve the group whose slug was supplied as router parameter
			this.auth.getGroup(params['group']).subscribe((group: any) => {
		  		// Retrieve this group's current theme
				this.auth.getTheme(group.current_theme).subscribe(response => {
			  		this.theme = response 
				});
		  	});	
		});
	}
}
