import Location from "@app/activity/location.model";
import {DateInterval} from "@app/activity/date-interval.model";

export interface Activity {
    id: string;
    name: string;
    photo: string;
    newPhotoContent: string | ArrayBuffer;
    description: string;
    source: string;
    location: Location;
    minNumberOfParticipants: number;
    maxNumberOfParticipants: number;
    minTemperature: number;
    maxTemperature: number;
    maxCloudiness: number;
    maxRain: number;
    maxSnow: number;
    maxFog: number;
    minWind: number;
    maxWind: number;
    dateIntervals: DateInterval[];
    timeIntervals: any[];
    labels: string[];
}
