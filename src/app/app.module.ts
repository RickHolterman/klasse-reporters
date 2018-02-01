import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppRoutes} from './app.routes';

import { AppComponent } from './app.component';
import { RssComponent } from './components/rss/rss.component';

@NgModule({
  declarations: [
    AppComponent,
    RssComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
