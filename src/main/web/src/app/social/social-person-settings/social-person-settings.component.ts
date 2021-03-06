import {Component, Input} from '@angular/core';
import {Person} from "@app/social/person.model";
import * as moment from "moment";
import {SocialService} from "@app/social/social.service";

@Component({
    selector: 'app-social-person-settings',
    templateUrl: './social-person-settings.component.html',
    styleUrls: ['./social-person-settings.component.scss']
})
export class SocialPersonSettingsComponent {

    @Input()
    public person: Person;

    constructor(private _socialService: SocialService) {
    }

    getLastContactInDaysAgo = () => {
        if (this.person && this.person.lastContact) {
            return moment().startOf("day").diff(moment(this.person.lastContact).startOf("day"), "days") + " days ago";
        } else {
            return "unknown";
        }
    };

    getImageUrl() {
        return this._socialService.getImageUrl(this.person.colorThumbnail);
    }
}
