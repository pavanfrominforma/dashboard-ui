import { Component, OnInit } from "@angular/core";
import { Form, FormControl } from "@angular/forms";
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
    predefinedComments: any[];

    isEditingComment = false;
    commentBoxCtrl: FormControl;
    commentBoxSelectControl: FormControl;
    selectedPredefinedComment: any = {name: "Select"};

    pagination: any = {
        pageNumber: 0,
        totalCount: 100,
        maxRecordsPerPage: 10,
        totalPages: 0,
        display: {
            start: 0,
            end: 0,
        },
    };

    feedType: string;
    feedCounts: any[];
    selectedFeedCount: any;
    isFeedCountLoading: boolean = false;   
    selectedRecord: any;

    // Filter
    tableColumns: any[];
    filters: any;

    constructor(
        private apiService: ApiService,
        private activeRoute: ActivatedRoute
    ) {
        this.overallData = [];
        this.headers = [];
        this.tableColumns = [];
        this.data = [];
        this.feedCounts = [];
        this.filters = {};
        this.commentBoxCtrl = new FormControl();
        this.commentBoxSelectControl = new FormControl();
        this.activeRoute.params.subscribe({
            next: (params: any) => {
                const feedtype =
                    this.activeRoute.snapshot.paramMap.get("feedtype");
                this.feedType = feedtype;
                this.filters = { FEEDTYPE: feedtype };
                this.loadFeedsData();
                this.reset();
                this.bringFeedCountToFront();
                this.getPredefinedComments();
            },
        });
    }

    ngOnInit(): void {
        this.loadFeedsCount();
        this.getPredefinedComments();
    }

    addFilter(filter: any){
        const filterKeys = Object.keys(filter);
        filterKeys.forEach((key: any) => {
            this.filters[key] = filter[key];
        })
    }

    removeFilter(filterObj: {field: string}){ 
        delete this.filters[filterObj.field];
    }
    reset() {
        this.headers.forEach((header: any) => (header.sortOrder = "desc"));
        this.isEditingComment = false;
        this.commentBoxCtrl.reset();
    }

    selectPredefinedComment(comment: any){
        console.log("Comment is clicked ", this.commentBoxSelectControl)
        if(typeof comment != 'object' || comment?.NAME == 'Select') {
            console.log("intog opnject ", comment);
            this.commentBoxCtrl.reset();
            this.commentBoxCtrl.setValue('');
            this.commentBoxCtrl.updateValueAndValidity();
            return;
        };
        if(comment.name == 'Others') return;
        this.commentBoxCtrl.setValue(comment.NAME);
        this.commentBoxCtrl.updateValueAndValidity();
    }

    getPredefinedComments(){
        this.apiService.getPredefinedComments().subscribe({
            next: (predefinedComments: any[]) => {
                this.predefinedComments = predefinedComments;
            }
        })
    }

    clearCommentBoxSelectors(){
        this.isEditingComment = false;
        this.selectedRecord = null;
        this.commentBoxCtrl.reset();
        this.selectPredefinedComment = null;
    }

    saveComment(){

        const dataFeedFileId = this.selectedRecord?.DATAFEEDFILEID;
        const dataFeedId = this.selectedRecord?.DATAFEEDID;
        const commentId = this.selectedRecord?.COMMENTID;
        const comment = this.commentBoxCtrl.value;

        const payload = {
            dataFeedFileId, dataFeedId, commentId, comment
        }
        this.apiService.saveComment(payload).subscribe({
            next: (res: any) => {
                console.log("Comments saved successfully !");
                alert(res?.message || "Comment saved successfully!");
                this.selectedRecord.COMMENTS = comment;
                $(".comments-icon-"+this.selectedRecord?.DATAFEEDFILEID)
                    .attr('title', comment)
                    .attr('data-bs-original-title', comment)
                    .tooltip();
            },
            error: (err: any) => {
                console.log("ERror is ", err);
                alert("Error occurred while saving comment!");
            }
        });
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
                this.bringFeedCountToFront();
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
                this.tableColumns = this.headers.slice();
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

    minimum(a: number, b: number) {
        return Math.min(a, b);
    }

    changePageRecords(recordsPerPage: string) {
        this.pagination.maxRecordsPerPage = Math.min(
            this.pagination.totalCount,
            Number(recordsPerPage)
        );
        if (this.pagination.pageNumber == this.pagination.totalCount)
            this.pagination.pageNumber = 0;
        this.pagination.totalPages = Math.ceil(
            this.pagination.totalCount / this.pagination.maxRecordsPerPage
        );
        this.paginate(this.pagination.pageNumber);
    }

    paginate(pageNumber: number) {
        pageNumber = Math.max(pageNumber, 0);
        pageNumber = Math.min(pageNumber, this.pagination.totalPages - 1);
        this.pagination.pageNumber = pageNumber;
        // console.log("Page number ", pageNumber);
        this.pagination.display.start =
            pageNumber * this.pagination.maxRecordsPerPage + 1;
        this.pagination.display.end = Math.min(
            (pageNumber + 1) * this.pagination.maxRecordsPerPage,
            this.pagination.totalCount
        );
        let startIndex = pageNumber * this.pagination.maxRecordsPerPage;
        let endIndex =
            pageNumber * this.pagination.maxRecordsPerPage +
            this.pagination.maxRecordsPerPage;
        this.data = this.overallData.slice(startIndex, endIndex);
        this.initTooltips();
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
            this.selectedFeedCount = feed;
            this.feedCounts.splice(index, 1);
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

    selectComment(comment: any){
        this.selectedRecord = comment;
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
        }, 500);

        setTimeout(() => {
            $('[data-toggle="tooltip"]').tooltip();
        }, 2500);
    }
}
