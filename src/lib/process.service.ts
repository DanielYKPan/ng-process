/**
 * process.service
 */

import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Optional,
    ReflectiveInjector, ViewContainerRef,
} from '@angular/core';
import { ProcessContainerComponent } from './process-container.component';
import { ProcessEvent, ProcessEventType } from './process-event.class';
import { Observable, Subject } from 'rxjs/Rx';
import { ProcessOptions } from './process-options.class';

@Injectable()
export class ProcessService {

    public eventSource: Subject<ProcessEvent> = new Subject<ProcessEvent>();
    public events: Observable<ProcessEvent> = this.eventSource.asObservable();
    private container: ComponentRef<any>;
    private rootViewContainerRef: ViewContainerRef;
    private speed: number = 200;
    private intervalId: any;
    private visibleTimeoutId: any;
    private disposeTimeoutId: any;
    private options: ProcessOptions = new ProcessOptions();

    /* Property visible */
    private visible: boolean = false;

    get Visible(): boolean {
        return this.visible;
    }

    set Visible( value: boolean ) {
        if (value !== undefined && value !== null) {
            this.visible = value;
            this.emitEvent(new ProcessEvent(ProcessEventType.VISIBLE, this.visible));
        }
    }

    /* Property progress */
    private progress: number = 0;

    get Progress(): number {
        return this.progress;
    }

    set Progress( value: number ) {
        if (value !== undefined && value !== null) {
            /*            if (value > 0) {
             this.Visible = true;
             }*/
            this.progress = value;
            this.emitEvent(new ProcessEvent(ProcessEventType.PROGRESS, this.progress));
        }
    }

    constructor( private componentFactoryResolver: ComponentFactoryResolver,
                 private appRef: ApplicationRef,
                 @Optional() options: ProcessOptions ) {
        if (options) {
            Object.assign(this.options, options);
        }
    }

    public setRootViewContainerRef( vRef: ViewContainerRef ) {
        this.rootViewContainerRef = vRef;
    }

    public start(): void {
        this.set();
        this.clear();
        this.Visible = true;
        if (this.options.type === 'bar') {
            this.startBarProcess();
        }
    }

    public done() {
        this.clear();
        if (this.options.type === 'bar') {
            this.doneBarProcess();
        } else if (this.options.type === 'page') {
            this.donePageProcess();
        }
    }

    private startBarProcess(): void {
        this.Progress = 0;
        this.intervalId = setInterval(() => {
            // Increment the progress and update view component
            this.trickle();
            // If the progress is 100% - call complete
            if (this.Progress === 100) {
                this.done();
            }
        }, this.speed);
    }

    private doneBarProcess(): void {
        this.Progress = 100;
        this.visibleTimeoutId = setTimeout(() => {
            // Hide it away
            this.Visible = false;
            this.disposeTimeoutId = setTimeout(() => {
                // Drop to 0
                this.Progress = 0;
                this.dispose();
            }, 600);
        }, 250);
    }

    private donePageProcess(): void {
        this.visibleTimeoutId = setTimeout(() => {
            this.Visible = false;
            this.disposeTimeoutId = setTimeout(() => {
                this.dispose();
            }, 700);
        }, 2000);
    }

    private trickle( amount?: number ): void {
        if (this.progress > 1) {
            return;
        }

        if (amount === undefined || amount === null) {
            if (this.progress >= 0 && this.progress < 0.2) {
                amount = 0.1;
            } else if (this.progress >= 0.2 && this.progress < 0.5) {
                amount = 0.04;
            } else if (this.progress >= 0.5 && this.progress < 0.8) {
                amount = 0.02;
            } else if (this.progress >= 0.8 && this.progress < 0.99) {
                amount = 0.005;
            } else {
                amount = 0;
            }
        }

        this.Progress = this.clamp(this.Progress + amount, 0, 0.994);
    }

    private clear(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        if (this.visibleTimeoutId) {
            clearTimeout(this.visibleTimeoutId);
            this.visibleTimeoutId = null;
        }
        if (this.disposeTimeoutId) {
            clearTimeout(this.disposeTimeoutId);
            this.disposeTimeoutId = null;
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

            // get options providers
            let providers = ReflectiveInjector.resolve([
                {provide: ProcessOptions, useValue: <ProcessOptions> this.options}
            ]);

            let processBarFactory =
                this.componentFactoryResolver.resolveComponentFactory(ProcessContainerComponent);
            let childInjector =
                ReflectiveInjector.fromResolvedProviders(providers,
                    this.rootViewContainerRef.parentInjector);

            this.container =
                this.rootViewContainerRef.createComponent(
                    processBarFactory, this.rootViewContainerRef.length, childInjector);
        }
    }

    private emitEvent( event: ProcessEvent ) {
        if (this.eventSource) {
            // Push up a new event
            this.eventSource.next(event);
        }
    }

    private clamp( n: number, min: number, max: number ): number {
        if (n < min) {
            return min;
        }
        if (n > max) {
            return max;
        }
        return n;
    }
}
