/**
 * app.component
 */

import { Component, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import {
    NavigationCancel, NavigationEnd, NavigationError, NavigationStart,
    Router
} from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ProcessService } from 'ng-process';

@Component({
    selector: 'yk-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

    private sub: Subscription;

    constructor( private router: Router,
                 private vRef: ViewContainerRef,
                 private service: ProcessService ) {
    }

    public ngOnInit(): void {
        this.service.setRootViewContainerRef(this.vRef);
        this.sub = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.service.start();
            } else if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError) {
                this.service.done();
            }
        }, ( error: any ) => {
            this.service.done();
        });
    }

    public ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
