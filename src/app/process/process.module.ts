/**
 * process.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProcessBarComponent } from './process-bar.component';
import { ProcessService } from './process.service';
import { ProcessContainerComponent } from './process-container.component';
import { ProcessIconComponent } from './process-icon.component';
import { ProcessOptions } from './process-options.class';

@NgModule({
    declarations: [
        ProcessContainerComponent,
        ProcessBarComponent,
        ProcessIconComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [],
    entryComponents: [ProcessContainerComponent]
})
export class ProcessModule {
    public static forRoot( config?: ProcessOptions ): ModuleWithProviders {
        return {
            ngModule: ProcessModule,
            providers: config ? [
                {provide: ProcessOptions, useValue: config},
                ProcessService,
            ] : [ProcessService],
        };
    }
}
