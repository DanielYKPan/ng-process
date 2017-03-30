/**
 * app.module
 */

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProcessBarModule } from './process/process-bar.module';

import '../sass/main.scss';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ProcessBarModule.forRoot({}),
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

