/**
 * process-bar.component
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessBarService } from './process-bar.service';
import { Subscription } from 'rxjs';
import { ProcessBarEvent, ProcessBarEventType } from './process-bar-event.class';

@Component({
    selector: 'app-process-bar',
    templateUrl: './process-bar.component.html',
    styleUrls: ['./process-bar.component.scss'],
})
export class ProcessBarComponent implements OnInit, OnDestroy {

    public progress: number = 0;
    public visible: boolean = true;
    private sub: Subscription;

    constructor( private service: ProcessBarService ) {
    }

    public ngOnInit() {
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
}
