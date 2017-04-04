/**
 * process-event.class
 */

export enum ProcessEventType {
    PROGRESS,
    VISIBLE
}

export class ProcessEvent {
    constructor( public type: ProcessEventType, public value: any ) {
    }
}
