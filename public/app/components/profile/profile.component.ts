import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

	private profile: any;

	currentUserId = this.authProvider.getUserDetails().id;

  	constructor(
  		public authProvider: AuthenticationService,
  		public profileProvider: ProfileService
  	) { }

	ngOnInit() {
	  	this.profileProvider.getProfile(this.currentUserId)
	  	.subscribe(response => 
	  		this.profile = response 
	  	);
	}
}
