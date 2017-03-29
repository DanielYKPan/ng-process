/**
 * process-icon.component
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProcessBarEvent, ProcessBarEventType } from './process-bar-event.class';
import { ProcessBarService } from './process-bar.service';

@Component({
    selector: 'app-process-icon',
    templateUrl: './process-icon.component.html',
    styleUrls: ['./process-icon.component.scss'],
})
export class ProcessIconComponent implements OnInit, OnDestroy {

    public visible: boolean = true;
    private sub: Subscription;

    constructor( private service: ProcessBarService ) {
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

}
