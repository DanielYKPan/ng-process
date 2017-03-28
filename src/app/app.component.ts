/**
 * app.component
 */

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProcessBarService } from './process/process-bar.service';

@Component({
    selector: 'yk-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    constructor( private vRef: ViewContainerRef,
                 private processBarService: ProcessBarService ) {
    }

    public ngOnInit(): void {
        this.processBarService.setRootViewContainerRef(this.vRef);
    }

    public add(): void {
        this.processBarService.start();
    }
}
