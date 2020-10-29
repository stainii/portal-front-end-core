import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "@app/activity/activity.model";

@Component({
    selector: 'app-activity-search-result',
    templateUrl: './activity-search-result.component.html',
    styleUrls: ['./activity-search-result.component.scss']
})
export class ActivitySearchResultComponent implements OnInit {

    @Input()
    activity: Activity;

    constructor() {
    }

    ngOnInit(): void {
    }

    formattedLocation() {
        if (this.activity && this.activity.location) {
            let parts = [this.activity.location.city, this.activity.location.province, this.activity.location.country];
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
