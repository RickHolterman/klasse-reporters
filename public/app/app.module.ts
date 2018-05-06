import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './app.routes';

import { AuthenticationService } from './services/authentication.service';
import { GroupService } from './services/group.service';
import { ThemeService } from './services/theme.service';
import { ProfileService } from './services/profile.service';
import { LicenceService } from './services/licence.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ThemeComponent } from './components/theme/theme.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupComponent } from './components/group/group.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ThemeComponent,
    GroupsComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    AuthenticationService,
    GroupService,
    ThemeService,
    ProfileService,
    LicenceService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
