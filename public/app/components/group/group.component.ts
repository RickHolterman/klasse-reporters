import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

	private group;
	private activeStudents;
	private requests;

 	constructor(
 		private groupProvider: GroupService,
 		private route: ActivatedRoute
 	) { }

 	ngOnInit() {
 		this.route.params.subscribe(params => {
 			this.groupProvider.getGroup(params['group']).subscribe((group: any) => {
 				this.group = group;
 				
 				var activeStudents = new Array();
 				var requests = new Array();

 				this.group.students.forEach(function(student) {
 					if (student.active) {
 						activeStudents.push(student);
 					} else {
 						requests.push(student);
 					}
 				});
 				this.activeStudents = activeStudents;
 				this.requests = requests;
 			});
 		});
 	}
}
