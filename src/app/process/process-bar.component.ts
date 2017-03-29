/**
 * process-bar.component
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessBarService } from './process-bar.service';

@Component({
    selector: 'app-process-bar',
    templateUrl: './process-bar.component.html',
    styleUrls: ['./process-bar.component.scss'],
})
export class ProcessBarComponent implements OnInit, OnDestroy {

    public progress: number = 0;
    public visible: boolean;
    private sub: any;
    private intervalId: any = 0;
    private speed: number = 500; // in milliseconds

    constructor() {
    }

    public ngOnInit() {
    }

    public ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    public start(): void {
        this.visible = true;
        this.progress = 0;
        this.intervalId = setInterval(() => {
            this.progress++;
            if (this.progress === 100) {
                this.complete();
            }
        }, this.speed);
    }

    public complete() {
        this.progress = 100;
        this.clear();
        setTimeout(() => {
            // Hide it away
            this.visible = false;
            setTimeout(() => {
                // Drop to 0
                this.progress = 0;
            }, 250);
        }, 250);
    }

    private clear(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
