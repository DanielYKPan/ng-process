/**
 * process-page.component
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessEvent, ProcessEventType } from './process-event.class';
import { Subscription } from 'rxjs/Rx';
import { ProcessService } from './process.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-process-page',
    templateUrl: './process-page.component.html',
    styleUrls: ['./process-page.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('up', style({transform: 'translateY(0) skew(-10deg) translateZ(0)'})),
            state('down', style({transform: 'translateY(0) skew(-10deg) translateZ(0)'})),
            state('show', style({transform: 'opacity: 1'})),
            transition('void => up', [
                style({transform: 'translateY(150%) skew(-10deg) translateZ(0)'}),
                animate('650ms ease')
            ]),
            transition('up => void', [
                animate('650ms 200ms ease',
                    style({transform: 'translateY(150%) skew(-10deg) translateZ(0)'}))
            ]),
            transition('void => down', [
                style({transform: 'translateY(-150%) skew(-10deg) translateZ(0)'}),
                animate('650ms ease')
            ]),
            transition('down => void', [
                animate('650ms 200ms ease',
                    style({transform: 'translateY(-150%) skew(-10deg) translateZ(0)'}))
            ]),
            transition('void => show', [
                style({opacity: 0}),
                animate('200ms 500ms ease')
            ]),
            transition('show => void', [
                animate('200ms ease',
                    style({opacity: 0}))
            ]),
        ])
    ]
})
export class ProcessPageComponent implements OnInit, OnDestroy {

    public visible: boolean = true;
    private sub: Subscription;

    constructor( private service: ProcessService ) {
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
}
