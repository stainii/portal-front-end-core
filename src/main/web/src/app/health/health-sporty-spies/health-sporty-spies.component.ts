import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {Report} from "@app/health/report.model";
import {HealthReportService} from "@app/health/health-report.service";

@Component({
  selector: 'app-health-sporty-spies',
  templateUrl: './health-sporty-spies.component.html',
  styleUrls: ['./health-sporty-spies.component.scss']
})
export class HealthSportySpiesComponent implements OnInit, OnChanges {

    @Input()
    recurringTasks: RecurringTask[];

    report: Report;

    constructor(private _reportService: HealthReportService) {
    }

    ngOnInit() {
        this.updateReport();
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (let propName in changes) {
            if (propName == "recurringTasks") {
                this.updateReport();
            }
        }
    }

    updateReport() {
        this.report = this._reportService.assemble(this.recurringTasks);
    }


}
