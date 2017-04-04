/**
 * app.module
 */

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';

import '../sass/main.scss';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './pages/home.component';
import { ContactComponent } from './pages/contact.component';
import { AboutComponent } from './pages/about.component';
import { ProcessModule } from 'ng-process';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ProcessModule.forRoot({
            type: 'page'
        }),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        AboutComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

