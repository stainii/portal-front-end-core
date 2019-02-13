import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HousagotchiRoutingModule} from './housagotchi-routing.module';
import {HousagotchiAppComponent} from './housagotchi-app/housagotchi-app.component';
import {HousagotchiAddExecutionComponent} from './housagotchi-add-execution/housagotchi-add-execution.component';
import {HousagotchiBalloonComponent} from './housagotchi-balloon/housagotchi-balloon.component';
import {HousagotchiCreatureComponent} from './housagotchi-creature/housagotchi-creature.component';
import {HousagotchiManageRecurringTasksComponent} from './housagotchi-manage-recurring-tasks/housagotchi-manage-recurring-tasks.component';
import {HousagotchiMenuBarForCreatureComponent} from './housagotchi-menu-bar-for-creature/housagotchi-menu-bar-for-creature.component';
import {HousagotchiMenuBarForManageRecurringTasksComponent} from './housagotchi-menu-bar-for-manage-recurring-tasks/housagotchi-menu-bar-for-manage-recurring-tasks.component';
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {HousagotchiRecurringTaskDetailsComponent} from './housagotchi-recurring-task-details/housagotchi-recurring-task-details.component';

@NgModule({
    imports: [
        CommonModule,
        HousagotchiRoutingModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatTableModule,
        MatRadioModule
    ],
    declarations: [
        HousagotchiAppComponent,
        HousagotchiAddExecutionComponent,
        HousagotchiBalloonComponent,
        HousagotchiCreatureComponent,
        HousagotchiManageRecurringTasksComponent,
        HousagotchiMenuBarForCreatureComponent,
        HousagotchiMenuBarForManageRecurringTasksComponent,
        HousagotchiRecurringTaskDetailsComponent
    ], entryComponents: [
        HousagotchiRecurringTaskDetailsComponent
    ]
})
export class HousagotchiModule {
}
