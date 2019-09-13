import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TaskDetailsDialogComponent} from "@app/todo/task-details-dialog/task-details-dialog.component";

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {

    }

    create() {
        console.log("create");
    }

}
