import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ModuleService} from "@app/module.service";
import {concatMap, defaultIfEmpty, map, reduce} from "rxjs/operators";

/**
 * Guard for the router.
 * Checks if the logged in user has the necessary rights to access a module
 */
@Injectable({
    providedIn: 'root'
})
export class AuthorisationGuardService implements CanActivate {

    constructor(private _moduleService: ModuleService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (state.url === "" ||
            state.url === "/" ||
            state.url === "login" ||
            state.url === "login/") {
            return true;
        } else {
            return this._moduleService
                .findModulesForLoggedInUser()
                .pipe(
                    concatMap(modules => modules), //split modules array up in a stream of modules, so that map can convert
                    map(module => state.url.toLowerCase().indexOf(module.name.toLowerCase()) > -1),
                    reduce((previousResult, urlContainsModule) => previousResult || urlContainsModule),
                    defaultIfEmpty(false)
                );
        }
    }
}
