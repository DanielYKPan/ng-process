/**
 * process-container.component
 */

import { Component, OnInit } from '@angular/core';
import { ProcessOptions } from './process-options.class';

@Component({
    selector: 'app-process-container',
    templateUrl: './process-container.component.html',
    styleUrls: ['./process-container.component.scss'],
})
export class ProcessContainerComponent implements OnInit {

    public processType: string;

    constructor( private options: ProcessOptions ) {
    }

    public ngOnInit() {
        this.processType = this.options.type;
    }
}
