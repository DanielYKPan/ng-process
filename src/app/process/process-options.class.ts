/**
 * process-options.class
 */

import { Injectable } from '@angular/core';

@Injectable()
export class ProcessOptions {

    public color?: string = 'firebrick';
    public height?: number = 2;
    public showSpinIcon?: boolean = true;
    public type?: 'bar' | 'page' = 'bar';

    constructor( options?: Object ) {
        if (options) {
            Object.assign(this, options);
        }
    }
}
