import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ManageActivitiesService} from "@app/activity/manage-activities.service";
import {fromEvent, merge, Observable, of, Subscription} from "rxjs";
import {catchError, debounceTime, map, startWith, switchMap} from "rxjs/operators";
import {Activity} from "@app/activity/activity.model";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {ActivityConfirmDeleteComponent} from "@app/activity/activity-confirm-delete/activity-confirm-delete.component";
import {Router} from "@angular/router";
import {MatTable} from "@angular/material/table";


@Component({
    selector: 'app-activity-manage-list',
    templateUrl: './activity-manage-list.component.html',
    styleUrls: ['./activity-manage-list.component.scss']
})
export class ActivityManageListComponent implements AfterViewInit, OnDestroy {

    displayedColumns: string[] = ['name', 'location', 'description', 'actions'];
    isLoadingResults = false;
    data: Activity[] = [];

    isHandset$: Observable<boolean>;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatTable)
    table: MatTable<Activity>;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild("input")
    filter: ElementRef;

    private isHandsetSubscription: Subscription;

    constructor(private manageActivitiesService: ManageActivitiesService, private breakpointObserver: BreakpointObserver,
                public dialog: MatDialog, private router: Router) {
        this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
            .pipe(map(result => result.matches));
        this.isHandsetSubscription = this.isHandset$.subscribe(isHandSet => this.changeDisplayedColumns(isHandSet));
    }

    ngAfterViewInit() {
        let sortChangeEvent = this.sort.sortChange;
        let pageChangeEvent = this.paginator.page;
        let filterKeyUpEvent = fromEvent(this.filter.nativeElement, "keyup").pipe(debounceTime(1000));

        merge(sortChangeEvent, pageChangeEvent, filterKeyUpEvent)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.manageActivitiesService!.find(
                        this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter.nativeElement.value);
                }),
                map(data => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.paginator.length = data.totalElements;
                    return data.content;
                }),
                catchError((error) => {
                    console.error(error);
                    this.isLoadingResults = false;
                    return of([]);
                })
            ).subscribe(data => this.data = data);

        sortChangeEvent.subscribe(() => this.paginator.pageIndex = 0);
    }

    ngOnDestroy() {
        this.isHandsetSubscription.unsubscribe();
    }

    deleteWhenConfirmed(activity: Activity) {
        const deleteDialog = this.dialog.open(ActivityConfirmDeleteComponent);

        deleteDialog.afterClosed().subscribe(deleteConfirmed => {
            if (deleteConfirmed) {
                this.manageActivitiesService.delete(activity)
                    .subscribe(() => {
                        this.data.splice(this.data.indexOf(activity), 1);
                        this.table.renderRows()
                    });
            }
        });
    }

    private changeDisplayedColumns(isHandSet: boolean) {
        if (isHandSet) {
            this.displayedColumns = ['name', 'actions'];
        } else {
            this.displayedColumns = ['name', 'location', 'description', 'actions'];
        }
    }

    formattedLocation(activity) {
        if (activity.location) {
            let parts = [activity.location.city, activity.location.province, activity.location.country];
            let formattedLocation = "";
            for(let part of parts) {
                if (part) {
                    if (formattedLocation != "") {
                        formattedLocation += ", ";
                    }
                    formattedLocation += part;
                }
            }
            return formattedLocation;
        }
        return "";
    }
}
