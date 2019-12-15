import {Component, OnInit} from '@angular/core';
import {ModuleService} from "@app/module/module.service";
import {Module} from "@app/module/module.model";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    modules: Module[];

    constructor(private _moduleService: ModuleService) {
        this.modules = [];
    }

    ngOnInit() {
        this._moduleService
            .findModulesForLoggedInUser()
            .subscribe(modules => this.modules = modules);
    }

}
