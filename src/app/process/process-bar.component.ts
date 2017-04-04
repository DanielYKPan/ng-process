/**
 * process-bar.component
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessService } from './process.service';
import { Subscription } from 'rxjs';
import { ProcessEvent, ProcessEventType } from './process-event.class';
import { ProcessOptions } from './process-options.class';

@Component({
    selector: 'app-process-bar',
    templateUrl: './process-bar.component.html',
    styleUrls: ['./process-bar.component.scss'],
})
export class ProcessBarComponent implements OnInit, OnDestroy {

    private progress: number = 0;
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
                } else if (event.type === ProcessEventType.PROGRESS) {
                    this.progress = event.value * 100;
                }
            }
        );
    }

    public ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    public getProcessBarStyles(): any {
        return {
            'width': this.progress + '%',
            'height.px': this.options.height,
            'opacity': this.visible ? 1 : 0,
            'background-color': this.options.color,
            'color': this.options.color
        };
    }
}
