import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';

@Component({
  	selector: 'app-groups',
  	templateUrl: './groups.component.html',
  	styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

	private groups: Array<any>;

  	constructor(private groupProvider: GroupService) { }

  	ngOnInit() {
  		this.groupProvider.getGroups().subscribe((groups: any) => {
  			this.groups = groups;
  		});
  	}
}
