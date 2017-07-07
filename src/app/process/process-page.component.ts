/**
 * process-page.component
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessEvent, ProcessEventType } from './process-event.class';
import { Subscription } from 'rxjs/Rx';
import { ProcessService } from './process.service';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-process-page',
    templateUrl: './process-page.component.html',
    styleUrls: ['./process-page.component.scss'],
    animations: [
        trigger('flyInOut', [
            transition(':enter', [
                group([
                    query('.left', [
                        style({transform: 'translateY(-150%) skew(-10deg) translateZ(0)'}),
                        animate('650ms ease', style({
                            transform: 'translateY(0) skew(-10deg) translateZ(0)'
                        }))
                    ]),
                    query('.right', [
                        style({transform: 'translateY(150%) skew(-10deg) translateZ(0)'}),
                        animate('650ms ease', style('*'))
                    ]),
                    query('.yk-loading-page-loader', [
                        style({opacity: 0}),
                        animate('500ms 400ms ease', style({opacity: 1}))
                    ]),
                ]),
            ]),
            transition(':leave', [
                group([
                    query('.left', [
                        animate('650ms 500ms ease',
                            style({transform: 'translateY(-150%) skew(-10deg) translateZ(0)'}))
                    ]),
                    query('.right', [
                        animate('650ms 500ms ease',
                            style({transform: 'translateY(150%) skew(-10deg) translateZ(0)'}))
                    ]),
                    query('.yk-loading-page-loader', [
                        animate('500ms ease', style({opacity: 0}))
                    ]),
                ]),
            ]),
        ]),
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

    public animationDone(event: any): void {
        console.log(event);
    }
}
