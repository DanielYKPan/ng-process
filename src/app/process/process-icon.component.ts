/**
 * process-icon.component
 */

import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProcessBarEvent, ProcessBarEventType } from './process-bar-event.class';
import { ProcessBarService } from './process-bar.service';
import { ProcessBarOptions } from './process-bar-options.class';

@Component({
    selector: 'app-process-icon',
    templateUrl: './process-icon.component.html',
    styleUrls: ['./process-icon.component.scss'],
})
export class ProcessIconComponent implements OnInit, OnDestroy {

    private visible: boolean = true;
    private color: string = 'firebrick';
    private sub: Subscription;

    constructor( private service: ProcessBarService,
                 @Optional() private options: ProcessBarOptions ) {
        if (options) {
            Object.assign(this, options);
        }
    }

    public ngOnInit() {
        this.sub = this.service.events.subscribe(
            ( event: ProcessBarEvent ) => {
                if (event.type === ProcessBarEventType.VISIBLE) {
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
            'border-top-color': this.color,
            'border-left-color': this.color,
            'opacity': this.visible ? 1 : 0,
        };
    }

}
