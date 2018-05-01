import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

	private profile: any;

	currentUserId = this.auth.getUserDetails().id;

  	constructor(public auth: AuthenticationService) { }

	ngOnInit() {
	  	this.auth.getProfile(this.currentUserId)
	  	.subscribe(response => 
	  		this.profile = response 
	  	);
	}
}
