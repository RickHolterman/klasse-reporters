import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { ThemeService } from '../../services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-theme',
	templateUrl: './theme.component.html',
	styleUrls: ['./theme.component.scss']
})

export class ThemeComponent implements OnInit {

	private theme: any;

	constructor(
		private groupProvider: GroupService,
		private themeProvider: ThemeService,
		private route: ActivatedRoute,
		private sanitizer: DomSanitizer
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			// Retrieve the group whose slug was supplied as router parameter
			this.groupProvider.getGroup(params['group']).subscribe((group: any) => {
		  		// Retrieve this group's current theme
				this.themeProvider.getTheme(group.current_theme).subscribe(response => {
			  		this.theme = response;
			  		// Bypass Angular's XSS protection by trusting the video urls
			  		this.theme.explanation.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.theme.explanation.video_url);
			  		this.theme.exercise.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.theme.exercise.video_url);
				});
		  	});	
		});
	}
}
