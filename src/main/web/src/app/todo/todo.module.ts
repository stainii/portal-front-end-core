import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {OverviewComponent} from './overview/overview.component';
import {MenuBarForOverviewComponent} from './menu-bar-for-overview/menu-bar-for-overview.component';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule} from "@angular/material";
import {TaskPanelComponent} from './task-panel/task-panel.component';

@NgModule({
    declarations: [OverviewComponent, MenuBarForOverviewComponent, TaskPanelComponent],
    imports: [
        CommonModule,
        TodoRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule
    ]
})
export class TodoModule {
}
