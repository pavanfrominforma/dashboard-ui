import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    apiUrl = environment.apiUrl;
    headers = { "Content-type": "application/json" };

    constructor(private http: HttpClient) {}

    getVdpFeeds(filters = {}) {
        const body = {
            filter: filters,
        };
        const url = `${this.apiUrl}/api/vdp/feeds`;
        return this.http.post(url, body, { headers: this.headers });
    }

    getVdpFeedsCount(filters = {}) {
        const url = `${this.apiUrl}/api/vdp/feeds/count`;
        return this.http.post(url, filters, { headers: this.headers });
    }

    saveComment(comment: any){
        const url = `${this.apiUrl}/api/vdp/feeds/comments`;
        return this.http.post(url, comment, { headers: this.headers });
    }

    getPredefinedComments(){
        const url = `${this.apiUrl}/api/vdp/feeds/comments/predefined`;
        return this.http.get(url, { headers: this.headers });
    }
}
