/**
 * process-icon.component
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ProcessEvent, ProcessEventType } from './process-event.class';
import { ProcessService } from './process.service';
import { ProcessOptions } from './process-options.class';

@Component({
    selector: 'app-process-icon',
    templateUrl: './process-icon.component.html',
    styleUrls: ['./process-icon.component.scss'],
})
export class ProcessIconComponent implements OnInit, OnDestroy {

    private visible: boolean = true;
    private sub: Subscription;

    constructor( private service: ProcessService,
                 private options: ProcessOptions ) {
    }

    public ngOnInit() {
        this.sub = this.service.events.subscribe(
            ( event: ProcessEvent ) => {
                if (event.type === ProcessEventType.VISIBLE) {
                    this.visible = event.value;
                }
            }
        );
    }

    public ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    public getProcessIconStyles(): any {
        return {
            'border-top-color': this.options.color,
            'border-left-color': this.options.color,
            'opacity': (this.visible && this.options.showSpinIcon) ? 1 : 0,
        };
    }

}
