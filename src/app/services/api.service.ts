import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    apiUrl = environment.apiUrl;
    headers = { "Content-type": "application/json" };

    constructor(private http: HttpClient) {}

    getVdpFeeds(filters = {}) {
        const url = `${this.apiUrl}/vdp/feeds`;
        return this.http.post(url, filters, { headers: this.headers });
    }

    getVdpFeedsCount(filters = {}) {
        const url = `${this.apiUrl}/vdp/feeds/count`;
        return this.http.post(url, filters, { headers: this.headers });
    }
}
