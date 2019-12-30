import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {TodoOverviewComponent} from './todo-overview/todo-overview.component';
import {TodoMenuBarForOverviewComponent} from './todo-menu-bar-for-overview/todo-menu-bar-for-overview.component';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule} from "@angular/material";
import {TodoTaskPanelComponent} from './todo-task-panel/todo-task-panel.component';
import {MatSelectModule} from "@angular/material/select";
import {TodoAppComponent} from './todo-app/todo-app.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {TodoMenuBarForSettingsComponent} from './todo-menu-bar-for-settings/todo-menu-bar-for-settings.component';
import {TodoSettingsComponent} from './todo-settings/todo-settings.component';
import {MatTreeModule} from "@angular/material/tree";
import {TodoTaskTemplateDetailsComponent} from "@app/todo/todo-task-template-details/todo-task-template-details.component";
import {TodoTaskTemplatesComponent} from './todo-task-templates/todo-task-templates.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {TodoTaskDefinitionDetailsComponent} from './todo-task-definition-details/todo-task-definition-details.component';
import {TodoTaskTemplateEntryDetailsComponent} from './todo-task-template-entry-details/todo-task-template-entry-details.component';
import {TodoTaskDetailsComponent} from './todo-task-details/todo-task-details.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    declarations: [
        TodoOverviewComponent,
        TodoMenuBarForOverviewComponent,
        TodoTaskPanelComponent,
        TodoAppComponent,
        TodoMenuBarForSettingsComponent,
        TodoSettingsComponent,
        TodoTaskTemplateDetailsComponent,
        TodoTaskTemplatesComponent,
        TodoTaskDefinitionDetailsComponent,
        TodoTaskTemplateEntryDetailsComponent,
        TodoTaskDetailsComponent
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
        MatStepperModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatTreeModule,
        MatTabsModule,
        MatListModule,
        MatTooltipModule,
    ],
    entryComponents: [
        TodoTaskDetailsComponent,
        TodoTaskTemplateDetailsComponent,
        TodoTaskTemplateEntryDetailsComponent
    ]
})
export class TodoModule {
}
