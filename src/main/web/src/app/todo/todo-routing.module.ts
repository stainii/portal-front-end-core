import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from "@app/todo/overview/overview.component";
import {MenuBarForOverviewComponent} from "@app/todo/menu-bar-for-overview/menu-bar-for-overview.component";
import {TodoAppComponent} from "@app/todo/todo-app/todo-app.component";

const routes: Routes = [{
    path: "",
    redirectTo: "overview"
}, {
    path: "",
    redirectTo: "overview",
    outlet: "menuBar"
}, {
    path: "overview",
    component: TodoAppComponent
}, {
    path: "overview",
    component: MenuBarForOverviewComponent,
    outlet: "menuBar"
}, {
    path: "task/:id",
        component: TodoAppComponent
}, {
    path: "task/:id",
        component: MenuBarForOverviewComponent,
        outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoRoutingModule {
}
