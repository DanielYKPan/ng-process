/**
 * app.module
 */

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProcessModule } from './process/process.module';

import '../sass/main.scss';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ProcessModule.forRoot({}),
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

