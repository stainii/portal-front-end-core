import {Component, OnInit} from '@angular/core';
import {ErrorService} from "@app/error/error.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent implements OnInit {

  constructor(private _errorService: ErrorService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
      this._errorService.errors$.subscribe(error => {
          this._snackBar.open(error.message, ":-{", {
              duration: 2000,
          });
          console.error(error);
      });

  }

  ngOnDestroy() {
      this._errorService.errors$.unsubscribe();
  }

}
