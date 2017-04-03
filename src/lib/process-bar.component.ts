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

    private progress: number = 0;
    private visible: boolean = true;
    private sub: Subscription;

    constructor( private service: ProcessBarService,
                 private options: ProcessBarOptions ) {
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
            'height.px': this.options.height,
            'opacity': this.visible ? 1 : 0,
            'background-color': this.options.color,
            'color': this.options.color
        };
    }
}
