import {delay, mergeMap, retryWhen} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {HttpInterceptor} from "@angular/common/http";
import {ErrorService} from "@app/error/error.service";
import {Injectable} from "@angular/core";

@Injectable()
export class RetryInterceptor implements HttpInterceptor {

    static DEFAULT_MAX_ATTEMPTS = 5;
    static DEFAULT_BACKOFF = 1000;

    constructor(private _errorService: ErrorService) {
    }

    intercept(req, next) {
        return next.handle(req)
            .pipe(this.retryWithBackoff(5000, 100, 1000));
    }

    retryWithBackoff(delayInMilliseconds: number, maxAttempts = RetryInterceptor.DEFAULT_MAX_ATTEMPTS, backoffInMilliseconds = RetryInterceptor.DEFAULT_BACKOFF) {
        let remainingAttempts = maxAttempts;

        return (src: Observable<any>) =>
            src.pipe(
                retryWhen((errors: Observable<any>) => errors.pipe(
                    mergeMap(error => {
                        remainingAttempts--;
                        if (remainingAttempts > 0) {
                            const backoffTime = delayInMilliseconds + (maxAttempts - remainingAttempts) * backoffInMilliseconds;
                            return of(error).pipe(delay(backoffTime));
                        }
                        return throwError(`Giving up after ${maxAttempts} attempts due to error ${error}`);
                    })
                ))
            );
    }
}
