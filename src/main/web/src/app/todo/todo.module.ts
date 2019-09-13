import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {OverviewComponent} from './overview/overview.component';
import {MenuBarForOverviewComponent} from './menu-bar-for-overview/menu-bar-for-overview.component';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule} from "@angular/material";
import {TaskPanelComponent} from './task-panel/task-panel.component';
import {MatSelectModule} from "@angular/material/select";
import {TodoAppComponent} from './todo-app/todo-app.component';
import {TaskDetailsDialogComponent} from './task-details-dialog/task-details-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
    declarations: [
        OverviewComponent,
        MenuBarForOverviewComponent,
        TaskPanelComponent,
        TodoAppComponent,
        TaskDetailsDialogComponent,
    ],
    imports: [
        CommonModule,
        TodoRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatStepperModule
    ],
    entryComponents: [
        TaskDetailsDialogComponent
    ]
})
export class TodoModule {
}
