import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
	// {
	// 	path: 'example',
	// 	component: exampleComponent
	// },
	// Catch all other routes and redirect to home
	{
		path: '**',
		redirectTo: '',
	}
];
