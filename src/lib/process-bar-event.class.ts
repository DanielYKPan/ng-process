/**
 * process-bar-event.class
 */

export enum ProcessBarEventType {
    PROGRESS,
    VISIBLE
}

export class ProcessBarEvent {
    constructor( public type: ProcessBarEventType, public value: any ) {
    }
}
