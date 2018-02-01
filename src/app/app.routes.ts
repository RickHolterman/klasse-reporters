import { Routes } from '@angular/router';

import { RssComponent } from './components/rss/rss.component';

export const AppRoutes: Routes = [
	{
		path: 'rss',
		component: RssComponent
	},
	// Catch all other routes and redirect to home
	{
		path: '**',
		redirectTo: '',
	}
];
