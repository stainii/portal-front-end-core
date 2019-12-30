import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoMenuBarForOverviewComponent} from "@app/todo/todo-menu-bar-for-overview/todo-menu-bar-for-overview.component";
import {TodoAppComponent} from "@app/todo/todo-app/todo-app.component";
import {TodoMenuBarForSettingsComponent} from "@app/todo/todo-menu-bar-for-settings/todo-menu-bar-for-settings.component";
import {TodoSettingsComponent} from "@app/todo/todo-settings/todo-settings.component";

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
    component: TodoMenuBarForOverviewComponent,
    outlet: "menuBar"
}, {
    path: "settings",
    component: TodoSettingsComponent
}, {
    path: "settings",
    component: TodoMenuBarForSettingsComponent,
    outlet: "menuBar"
}, ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoRoutingModule {
}
