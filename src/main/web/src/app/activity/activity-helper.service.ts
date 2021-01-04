import {Injectable} from '@angular/core';
import {environment} from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class ActivityHelperService {

    public getPhotoUrl(photo) {
        return `${environment.apiBaseUrl}image/api/retrieve/${photo}`;
    }

    public searchParamsToString(searchParams: string[]): string {
        let searchParamsAsString = "?";
        if (searchParams.length > 0) {
            searchParamsAsString += searchParams[0];
        }
        if (searchParams.length > 1) {
            for (let i = 1; i < searchParams.length; i++) {
                searchParamsAsString += `&${searchParams[i]}`
            }
        }
        return searchParamsAsString;
    }

}
