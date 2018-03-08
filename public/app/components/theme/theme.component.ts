import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-theme',
	templateUrl: './theme.component.html',
	styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

	theme = {
		header: "Thema van de week: Fake News",
		content: "Fake news is tegenwoordig een bekend fenomeen. Steeds vaker zie je artikelen opduiken die volstaan met onzin. Hoe herken je zulke artikelen? Deze week komen we erachter!",
		statement: "Nepnieuws maken is...",
		explanation: 
		{
			videoUrl: "src='https://www.youtube.com/embed/QDvWWkYyTPU?rel=0&amp;showinfo=0'",
			header: "Enzo Knol over fake news",
			content: "Enzo Knol legt ons uit hoe nepnieuws herkend kan worden en waarom het zo belangrijk is om dit te kunnen herkennen!"
		},
		exercise:
		{
			videoUrl: "",
			header: "Your Turn!",
			content: "Deze keer ga je zelf aan de slag met het maken van nepnieuws. Enzo knol vertelt je hoe dit moet!"
		}
	};

	constructor() { }

	ngOnInit() {
	}
}
