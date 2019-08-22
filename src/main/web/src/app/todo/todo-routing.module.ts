import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from "@app/todo/overview/overview.component";
import {MenuBarForOverviewComponent} from "@app/todo/menu-bar-for-overview/menu-bar-for-overview.component";

const routes: Routes = [{
    path: "",
    redirectTo: "overview"
}, {
    path: "",
    redirectTo: "overview",
    outlet: "menuBar"
}, {
    path: "overview",
    component: OverviewComponent
}, {
    path: "overview",
    component: MenuBarForOverviewComponent,
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoRoutingModule {
}
