import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CommonService {
    private loaderSubject: Subject<boolean>;

    constructor() {
        this.loaderSubject = new Subject();
    }

    getLoaderAsObservable = () => this.loaderSubject.asObservable();
    showLoader = () => this.loaderSubject.next(true);
    hideLoader = () => this.loaderSubject.next(false);
}
