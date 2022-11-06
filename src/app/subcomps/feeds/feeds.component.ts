import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { getSorterBy, prefixZero } from "src/app/utils/common.utils";
declare var $: any;

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
        maxRecordsPerPage: 10,
        totalPages: 0,
    };

    feedType: string;
    feedCounts: any[];
    isFeedCountLoading: boolean = false;

    // Filter
    filters: any;

    constructor(
        private apiService: ApiService,
        private activeRoute: ActivatedRoute
    ) {
        this.overallData = [];
        this.headers = [];
        this.data = [];
        this.feedCounts = [];
        this.filters = {};

        this.activeRoute.params.subscribe({
            next: (params: any) => {
                const feedtype =
                    this.activeRoute.snapshot.paramMap.get("feedtype");
                this.feedType = feedtype;
                this.filters = { FEEDTYPE: feedtype };
                this.loadFeedsData();
                this.reset();
                this.bringFeedCountToFront();
            },
        });
    }

    ngOnInit(): void {
        this.loadFeedsCount();
    }

    reset() {
        this.headers.forEach((header: any) => (header.sortOrder = "desc"));
    }

    loadFeedsCount() {
        this.isFeedCountLoading = true;
        this.apiService.getVdpFeedsCount().subscribe({
            next: (response: any) => {
                this.feedCounts = response;
                this.feedCounts.forEach((feed) => {
                    feed.active = prefixZero(feed.active);
                    feed.inactive = prefixZero(feed.inactive);
                });
                this.isFeedCountLoading = false;
            },
            complete: () => {
                this.isFeedCountLoading = false;
            },
        });
    }

    loadFeedsData() {
        this.isLoading = true;
        this.apiService.getVdpFeeds(this.filters).subscribe({
            next: (response: any) => {
                this.headers = this.modifyHeadersPosition(response.headers);
                const feedStatusHeader = this.headers.filter(
                    (header: any) =>
                        header.field.toLowerCase().indexOf("status") > -1
                );
                // console.log("Feed status header ", feedStatusHeader);
                this.overallData = response.data;
                if (feedStatusHeader.length > 0)
                    this.overallData = this.sortBy(
                        feedStatusHeader[0],
                        this.overallData
                    );
                this.pagination.totalCount = response.count;
                this.pagination.totalPages = Math.ceil(
                    response.count / this.pagination.maxRecordsPerPage
                );
                this.paginate(this.pagination.pageNumber);
                this.isLoading = false;
            },
            complete: () => {
                this.isLoading = false;
                this.initTooltips();
            },
        });
    }

    paginate(pageNumber: number) {
        pageNumber = Math.max(pageNumber, 0);
        pageNumber = Math.min(pageNumber, this.pagination.totalPages - 1);
        this.pagination.pageNumber = pageNumber;
        // console.log("Page number ", pageNumber);
        let startIndex = pageNumber * this.pagination.maxRecordsPerPage;
        let endIndex =
            pageNumber * this.pagination.maxRecordsPerPage +
            this.pagination.maxRecordsPerPage;
        this.data = this.overallData.slice(startIndex, endIndex);
    }

    bringFeedCountToFront() {
        console.log("Finding feeds ", this.feedType);
        let index = -1;
        // console.log("CNTS ", this.feedCounts);
        const actualFeed = this.feedCounts.filter((feed: any, idx: number) => {
            const isValid = this.feedType == feed.feedtype;
            if (isValid) index = idx;
            return isValid;
        });
        if (actualFeed.length > 0) {
            const feed = actualFeed[0];
            // console.log("Splice ", this.feedCounts.splice(index, 1));
            this.feedCounts = [feed, ...this.feedCounts];
            // console.log("Con ", this.feedCounts);
        }
    }
    modifyHeadersPosition(headers: any[]) {
        headers = headers.filter((header: any) => header.show);
        headers = headers.sort((a: any, b: any) => a.position - b.position);
        return headers;
    }

    sortBy(header: any, data: any[]) {
        const field = header.field;
        const datatype = header.datatype;
        const sorter = getSorterBy(datatype);
        header.sortOrder = header.sortOrder == "asc" ? "desc" : "asc";
        let sortFunction = (prev: any, next: any) => sorter(prev, next, field);
        this.activateCaret(field, header.sortOrder);
        if (header.sortOrder == "desc")
            sortFunction = (prev: any, next: any) => sorter(next, prev, field);
        return data.sort(sortFunction);
    }

    activateCaret(header: string, sortOrder: string) {
        $(".caret").removeClass("active");
        const directionCaretClass =
            sortOrder == "asc" ? ".up-caret" : ".down-caret";
        $(`.caret.caret-${header}${directionCaretClass}`).addClass("active");
    }

    initTooltips() {
        setTimeout(() => {
          $('[data-toggle="tooltip"]').tooltip();
        }, 2000);
    }
}
