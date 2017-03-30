/**
 * process-bar-options.class
 */

import { Injectable } from '@angular/core';

@Injectable()
export class ProcessBarOptions {

    public color?: string = 'firebrick';
    public height?: number = 2;

    constructor( options: Object ) {
        Object.assign(this, options);
    }
}
