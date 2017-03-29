/**
 * process-bar.service
 */

import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable,
    ReflectiveInjector,
    ViewContainerRef,
} from '@angular/core';
import { ProcessContainerComponent } from './process-container.component';
import { ProcessBarEvent, ProcessBarEventType } from './process-bar-event.class';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProcessBarService {

    public eventSource: Subject<ProcessBarEvent> = new Subject<ProcessBarEvent>();
    public events: Observable<ProcessBarEvent> = this.eventSource.asObservable();
    private container: ComponentRef<any>;
    private rootViewContainerRef: ViewContainerRef;
    private speed: number = 500;
    private intervalId: any;

    /* Property visible */
    private visible: boolean = false;

    get Visible(): boolean {
        return this.visible;
    }

    set Visible( value: boolean ) {
        if (value !== undefined && value !== null) {
            this.visible = value;
            this.emitEvent(new ProcessBarEvent(ProcessBarEventType.VISIBLE, this.visible));
        }
    }

    /* Property progress */
    private progress: number = 0;

    get Progress(): number {
        return this.progress;
    }

    set Progress( value: number ) {
        if (value !== undefined && value !== null) {
            if (value > 0) {
                this.Visible = true;
            }
            this.progress = value;
            this.emitEvent(new ProcessBarEvent(ProcessBarEventType.PROGRESS, this.progress));
        }
    }

    constructor( private componentFactoryResolver: ComponentFactoryResolver,
                 private appRef: ApplicationRef ) {
    }

    public setRootViewContainerRef( vRef: ViewContainerRef ) {
        this.rootViewContainerRef = vRef;
    }

    public start(): void {
        this.set();
        this.clear();
        this.Visible = true;
        this.intervalId = setInterval(() => {
            // Increment the progress and update view component
            this.Progress++;
            // If the progress is 100% - call complete
            if (this.Progress === 100) {
                this.complete();
            }
        }, this.speed);
    }

    public complete() {
        this.Progress = 100;
        this.clear();
        setTimeout(() => {
            // Hide it away
            this.Visible = false;
            setTimeout(() => {
                // Drop to 0
                this.Progress = 0;
                this.dispose();
            }, 250);
        }, 250);
    }

    private clear(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private dispose(): void {
        if (this.container) {
            this.container.destroy();
            this.container = null;
            return;
        }
        return;
    }

    private set(): void {
        if (!this.container) {
            // get app root view component ref
            if (!this.rootViewContainerRef) {
                try {
                    this.rootViewContainerRef =
                        this.appRef['_rootComponents'][0]['_hostElement'].vcRef;
                } catch (e) {
                    console.log(new Error(
                        'Please set root ViewContainerRef using ' +
                        'setRootViewContainerRef(vRef: ViewContainerRef) method.'));
                }
            }

            let processBarFactory =
                this.componentFactoryResolver.resolveComponentFactory(ProcessContainerComponent);
            let childInjector =
                ReflectiveInjector.fromResolvedProviders([],
                    this.rootViewContainerRef.parentInjector);

            this.container =
                this.rootViewContainerRef.createComponent(
                    processBarFactory, this.rootViewContainerRef.length, childInjector);
        }
    }

    private emitEvent( event: ProcessBarEvent ) {
        if (this.eventSource) {
            // Push up a new event
            this.eventSource.next(event);
        }
    }
}
