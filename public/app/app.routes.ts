import { Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ThemeComponent } from './components/theme/theme.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupComponent } from './components/group/group.component';

export const AppRoutes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: 'groups',
		component: GroupsComponent
	},
	{
		path: 'groups/:group',
		component: GroupComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'profile',
		component: ProfileComponent
	},
	{
		path: ':group/theme',
		component: ThemeComponent
	},
	// Catch all other routes and redirect to home
	{
		path: '**',
		redirectTo: '/',
	}
];
