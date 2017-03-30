/**
 * process-bar.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProcessBarComponent } from './process-bar.component';
import { ProcessBarService } from './process-bar.service';
import { ProcessContainerComponent } from './process-container.component';
import { ProcessIconComponent } from './process-icon.component';
import { ProcessBarOptions } from './process-bar-options.class';

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
export class ProcessBarModule {
    public static forRoot( config?: ProcessBarOptions ): ModuleWithProviders {
        return {
            ngModule: ProcessBarModule,
            providers: config ? [
                {provide: ProcessBarOptions, useValue: config},
                ProcessBarService,
            ] : [ProcessBarService],
        };
    }
}
