import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ModuleService} from "@app/module/module.service";
import {concatMap, filter, map} from "rxjs/operators";

/**
 * Guard for the router.
 * Checks if the user is logged in, before letting him/her go to any page.
 */
@Injectable({
    providedIn: 'root'
})
export class DefaultRouteGuardService implements CanActivate {

    constructor(private _moduleService: ModuleService, private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._moduleService
            .findModulesForLoggedInUser()
            .pipe(
                concatMap(modules => modules), //split modules array up in a stream of modules, so that map can convert
                filter(module => module.openByDefault),
                map(module => this._router.parseUrl(module.name.toLowerCase()))
            );
    }
}
