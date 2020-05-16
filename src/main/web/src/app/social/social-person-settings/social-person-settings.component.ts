import {Component, Input} from '@angular/core';
import {Person} from "@app/social/person.model";
import * as moment from "moment";

@Component({
    selector: 'app-social-person-settings',
    templateUrl: './social-person-settings.component.html',
    styleUrls: ['./social-person-settings.component.scss']
})
export class SocialPersonSettingsComponent {

    @Input()
    public person: Person;

    getLastContactInDaysAgo = () => {
        if (this.person && this.person.lastContact) {
            return moment().startOf("day").diff(moment(this.person.lastContact).startOf("day"), "days") + " days ago";
        } else {
            return "unknown";
        }
    };

}
