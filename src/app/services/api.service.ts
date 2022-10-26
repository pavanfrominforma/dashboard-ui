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

    getVdpFeeds() {
        const url = `${this.apiUrl}/vdp/feeds`;
        return this.http.get(url, { headers: this.headers });
    }
}
