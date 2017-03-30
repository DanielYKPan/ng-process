/**
 * process-bar.component
 */

import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { ProcessBarService } from './process-bar.service';
import { Subscription } from 'rxjs';
import { ProcessBarEvent, ProcessBarEventType } from './process-bar-event.class';
import { ProcessBarOptions } from './process-bar-options.class';

@Component({
    selector: 'app-process-bar',
    templateUrl: './process-bar.component.html',
    styleUrls: ['./process-bar.component.scss'],
})
export class ProcessBarComponent implements OnInit, OnDestroy {

    private color: string = 'firebrick';
    private height: number = 2;
    private progress: number = 0;
    private visible: boolean = true;
    private sub: Subscription;

    constructor( private service: ProcessBarService,
                 @Optional() private options: ProcessBarOptions ) {
        if (options) {
            Object.assign(this, options);
        }
    }

    public ngOnInit() {
        console.log();
        this.sub = this.service.events.subscribe(
            ( event: ProcessBarEvent ) => {
                if (event.type === ProcessBarEventType.VISIBLE) {
                    this.visible = event.value;
                } else if (event.type === ProcessBarEventType.PROGRESS) {
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
            'height.px': this.height,
            'opacity': this.visible ? 1 : 0,
            'background-color': this.color,
            'color': this.color
        };
    }
}
