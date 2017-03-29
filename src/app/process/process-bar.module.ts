/**
 * process-bar.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProcessBarComponent } from './process-bar.component';
import { ProcessBarService } from './process-bar.service';
import { ProcessContainerComponent } from './process-container.component';

@NgModule({
    declarations: [
        ProcessContainerComponent,
        ProcessBarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [],
    providers: [ProcessBarService],
    entryComponents: [ProcessContainerComponent]
})
export class ProcessBarModule {
}
