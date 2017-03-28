/**
 * process-bar.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProcessBarComponent } from './process-bar.component';
import { ProcessBarService } from './process-bar.service';

@NgModule({
    declarations: [
        ProcessBarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [],
    providers: [ProcessBarService],
    entryComponents: [ProcessBarComponent]
})
export class ProcessBarModule {
}
