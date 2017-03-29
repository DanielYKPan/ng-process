/**
 * process-bar.service
 */

import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable,
    ReflectiveInjector,
    ViewContainerRef,
} from '@angular/core';
import { ProcessBarComponent } from './process-bar.component';

@Injectable()
export class ProcessBarService {

    private processBar: ComponentRef<any>;
    private rootViewContainerRef: ViewContainerRef;

    constructor( private componentFactoryResolver: ComponentFactoryResolver,
                 private appRef: ApplicationRef ) {
    }

    public setRootViewContainerRef( vRef: ViewContainerRef ) {
        this.rootViewContainerRef = vRef;
    }

    public start(): void {
        this.set();
        this.processBar.instance.start();
    }

    public dispose(): void {
        if (this.processBar) {
            this.processBar.destroy();
            this.processBar = null;
            return;
        }
        return;
    }

    private set(): void {
        if (!this.processBar) {
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
                this.componentFactoryResolver.resolveComponentFactory(ProcessBarComponent);
            let childInjector =
                ReflectiveInjector.fromResolvedProviders([],
                    this.rootViewContainerRef.parentInjector);

            this.processBar =
                this.rootViewContainerRef.createComponent(
                    processBarFactory, this.rootViewContainerRef.length, childInjector);
        }
    }
}
