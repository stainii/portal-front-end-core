import {Component, OnInit} from '@angular/core';
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DEPLOYMENT_NAME} from "@app/setlist/setlist-constants";
import {SetlistSongDetailsComponent} from "@app/setlist/setlist-song-details/setlist-song-details.component";

@Component({
  selector: 'app-setlist-manage',
  templateUrl: './setlist-manage.component.html',
  styleUrls: ['./setlist-manage.component.scss']
})
export class SetlistManageComponent implements OnInit {

    displayedColumns: string[] = ['name', 'minNumberOfDaysBetweenExecutions', 'maxNumberOfDaysBetweenExecutions', 'edit', 'delete',];
    setlist: RecurringTask[];

    constructor(private _recurringTaskService: RecurringTaskService,
                private _snackBar: MatSnackBar,
                private _dialog: MatDialog) {
    }

    ngOnInit() {
        this._loadSetlist();
    }

    edit(song: RecurringTask): void {
        this._showDialog(song);
    }

    create() {
        this._showDialog(new RecurringTask());
    }

    delete(song: RecurringTask) {
        this._recurringTaskService
            .delete(DEPLOYMENT_NAME, song)
            .subscribe(() => {
                this._loadSetlist();
                this._snackBar.open(`${song.name} deleted`, "Ok!", {
                    duration: 2000,
                });
            });
    }

    private _loadSetlist() {
        this._recurringTaskService
            .findAll(DEPLOYMENT_NAME)
            .subscribe(setlist => this.setlist = setlist);
    }

    private _showDialog(song: RecurringTask) {
        const dialogRef = this._dialog.open(SetlistSongDetailsComponent, {
            width: '250px',
            data: {song: song}
        });

        dialogRef.afterClosed().subscribe(result => {
            let isNew = !result.id;
            if (isNew) {
                this._recurringTaskService.create(DEPLOYMENT_NAME, result).subscribe(() => {
                    this._loadSetlist();
                });
                this._snackBar.open(`${result.name} created!`, "Ok!", {
                    duration: 2000,
                });
            } else {
                this._recurringTaskService.update(DEPLOYMENT_NAME, result).subscribe(() => {
                    this._loadSetlist();
                    this._snackBar.open(`${result.name} updated!`, "Ok!", {
                        duration: 2000,
                    });
                });
            }
        });
    }

}
