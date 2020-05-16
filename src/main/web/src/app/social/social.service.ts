import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Person} from "@app/social/person.model";
import {environment} from "@env/environment";
import {Observable} from "rxjs";
import {Contact} from "@app/social/contact.model";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class SocialService {

    constructor(private _http: HttpClient) {
    }

    create(person: Person) {
        return this._http.post(`${environment.apiBaseUrl}social/api/person/`, person);
    }

    update(person: Person) {
        return this._http.put( `${environment.apiBaseUrl}social/api/person/${person.id}/`, person);
    }

    delete(person: Person) {
        return this._http.delete( `${environment.apiBaseUrl}social/api/person/${person.id}/`);
    }

    findAll(): Observable<Person[]> {
        return this._http.get<Person[]>(`${environment.apiBaseUrl}social/api/person/`);
    }

    addContact(contact: Contact, person: Person) {
        return this._http.post<Person>(`${environment.apiBaseUrl}social/api/person/${person.id}/contact/`, {
            latestUpdates: contact.latestUpdates,
            lastContact:  moment(contact.lastContact).format("YYYY-MM-DDT00:00:00")
        });
    }
}
