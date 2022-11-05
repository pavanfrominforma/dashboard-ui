import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { prefixZero } from "src/app/utils/common.utils";

@Component({
    selector: "app-feeds",
    templateUrl: "./feeds.component.html",
    styleUrls: ["./feeds.component.scss"],
})
export class FeedsComponent implements OnInit {
    overallData: any[];
    headers: any[];
    data: any[];
    isLoading = false;

    pagination: any = {
        pageNumber: 0,
        totalCount: 100,
        maxRecordsPerPage: 50,
        totalPages: 0,
    };

    feedCounts: any[];
    isFeedCountLoading: boolean;

    constructor(private apiService: ApiService) {
        this.overallData = [];
        this.headers = [];
        this.data = [];
        this.feedCounts = [];
        this.isFeedCountLoading = false;
    }

    ngOnInit(): void {
        this.loadFeedsCount();
        this.loadFeedsData();
    }

    loadFeedsCount() {
        this.isFeedCountLoading = true;
        this.apiService.getVdpFeedsCount().subscribe({
            next: (response: any) => {
                this.feedCounts = response;
                this.feedCounts.forEach((feed) => {
                    feed.active = prefixZero(feed.active)
                    feed.inactive = prefixZero(feed.inactive);
                });
                this.isFeedCountLoading = false;
            },
            complete: () => (this.isFeedCountLoading = false),
        });
    }

    loadFeedsData() {
        this.isLoading = true;
        this.apiService.getVdpFeeds().subscribe({
            next: (response: any) => {
                this.headers = this.modifyHeadersPosition(response.headers);
                this.overallData = response.data;
                this.pagination.totalCount = response.count;
                this.pagination.totalPages = Math.ceil(
                    response.count / this.pagination.maxRecordsPerPage
                );
                this.paginate(this.pagination.pageNumber);
                this.isLoading = false;
            },
            complete: () => (this.isLoading = false),
        });
    }

    paginate(pageNumber: number) {
        pageNumber = Math.max(pageNumber, 0);
        pageNumber = Math.min(pageNumber, this.pagination.totalPages - 1);
        this.pagination.pageNumber = pageNumber;
        console.log("Page number ", pageNumber);
        let startIndex = pageNumber * this.pagination.maxRecordsPerPage;
        let endIndex =
            pageNumber * this.pagination.maxRecordsPerPage +
            this.pagination.maxRecordsPerPage;
        this.data = this.overallData.slice(startIndex, endIndex);
    }

    modifyHeadersPosition(headers: any[]) {
        headers = headers.filter((header: any) => header.show);
        return headers.sort((a: any, b: any) => a.position - b.position);
    }

}
