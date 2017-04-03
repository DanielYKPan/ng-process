/**
 * process-bar-options.class
 */

import { Injectable } from '@angular/core';

@Injectable()
export class ProcessBarOptions {

    public color?: string = 'firebrick';
    public height?: number = 2;
    public showSpinIcon?: boolean = true;

    constructor( options?: Object ) {
        if (options) {
            Object.assign(this, options);
        }
    }
}
