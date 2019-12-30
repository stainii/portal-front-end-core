import {Component} from '@angular/core';
import {fromEvent} from "rxjs";
import {mapTo} from "rxjs/operators";

@Component({
    selector: 'app-offline-indicator',
    templateUrl: './offline-indicator.component.html',
    styleUrls: ['./offline-indicator.component.scss']
})
export class OfflineIndicatorComponent {

    isOffline: boolean;

    constructor() {
        fromEvent(window, 'offline').pipe(mapTo(true))
            .subscribe(isOffline => this.isOffline = isOffline);
        fromEvent(window, 'online').pipe(mapTo(true))
            .subscribe(isOnline => this.isOffline = !isOnline);
    }

}
