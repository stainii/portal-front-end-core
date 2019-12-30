import {delay, mapTo, retryWhen, switchMap} from "rxjs/operators";
import {fromEvent, throwError} from "rxjs";
import {HttpInterceptor} from "@angular/common/http";
import {ErrorService} from "@app/error/error.service";
import {Injectable} from "@angular/core";

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
    private onlineChanges$ = fromEvent(window, 'online').pipe(mapTo(true));
    private onlineChangesWithDelay$ = fromEvent(window, 'online').pipe(delay(1000), mapTo(true));

    constructor(private _errorService: ErrorService) {
    }

    get isOnline() {
        return navigator.onLine;
    }

    intercept(req, next) {
        return next.handle(req).pipe(
            retryWhen(errors => {
                if (this.isOnline) {
                    return errors.pipe(switchMap(err => throwError(err)));
                }

                // we're offline!
                this._errorService.notify(new Error("Http request failed because we're offline. Retrying later..."));

                // when coming back online, POSTs should happen before PATCHes. Ugly hack to make this happen...
                if (req.method == "PATCH") {
                    debugger;
                    return this.onlineChangesWithDelay$;
                } else {
                    return this.onlineChanges$;
                }
            })
        );
    }
}
