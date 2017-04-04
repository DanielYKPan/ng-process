/**
 * app.component
 */

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProcessService } from './process/process.service';

@Component({
    selector: 'yk-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    constructor( private vRef: ViewContainerRef,
                 private processService: ProcessService ) {
    }

    public ngOnInit(): void {
        this.processService.setRootViewContainerRef(this.vRef);
    }

    public start(): void {
        this.processService.start();

        setTimeout(() => {
            this.done();
        }, 100);
    }

    public done(): void {
        this.processService.done();
    }
}
