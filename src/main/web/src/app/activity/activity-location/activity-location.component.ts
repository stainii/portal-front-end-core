import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchActivitiesService} from "@app/activity/search-activities.service";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {RandomAdjectiveService} from "@app/funny-details/random-adjective.service";

@Component({
    selector: 'app-activity-location',
    templateUrl: './activity-location.component.html',
    styleUrls: ['./activity-location.component.scss']
})
export class ActivityLocationComponent implements OnInit {

    location: string;
    placeholder: string;

    @ViewChild('locationElement')
    locationElement: ElementRef;

    constructor(private searchActivitiesService: SearchActivitiesService, private randomAdjectiveService: RandomAdjectiveService) {
    }

    ngOnInit(): void {
        this.location = this.searchActivitiesService.getLocation();
        this.placeholder = `My ${this.randomAdjectiveService.lowercase()} location`;
    }

    ngAfterViewInit(): void {
        fromEvent(this.locationElement.nativeElement, 'input')
            .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
            .pipe(debounceTime(1000))
            .pipe(distinctUntilChanged())
            .subscribe(data => this.updateLocation(data));
    }

    updateLocation(location: string) {
        this.searchActivitiesService.updateLocation(location);
    }

}
