import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../app/services/api.service';
import { getSorterBy, prefixZero } from "../../../app/utils/common.utils";

@Component({
  selector: 'app-llfin',
  templateUrl: './llfin.component.html',
  styleUrls: ['./llfin.component.scss']
})
export class LlfinComponent implements OnInit, AfterViewChecked {

  tableColumns: any = [];
  isLoading: Boolean = false;
  filters: any = {};
  allHeaders: any[] =  [];
  headers: any[] = [];
  overallData: any[] = [];
  data: any[] = [];
  selectedFeedCount = {
    active: 0, inactive: 0, due: 0
  } as any;
  isFeedCountLoading = false;

  
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

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadFeedsData();
    this.loadFeedsCount();
  }

  
  loadFeedsData() {
    this.isLoading = true;
    this.apiService.getLLFINFeeds(this.filters).subscribe({
        next: (response: any) => {
            this.allHeaders = response.headers;
            this.allHeaders.forEach((header) => header.canShow = true);
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

  loadFeedsCount() {
    this.isFeedCountLoading = true;
    this.apiService.getLLFINFeedStatusCount().subscribe({
        next: (response: any) => {
            const feed = response;
            this.selectedFeedCount = {
              active: prefixZero(feed.active),
              inactive: prefixZero(feed.inactive),
              due: prefixZero(feed.due)
            }
            this.isFeedCountLoading = false;
        },
        complete: () => {
            this.isFeedCountLoading = false;
        },
    });
}

 ngAfterViewChecked(): void {
        let dcols = $(".sticky-column:nth-last-child(1)");
        let scols = $(".sticky-column:nth-last-child(2)");
        let lastW = $(dcols).width() + 32;
        const s = `right: ${lastW}px !important;`
        $(scols).attr("style", s);
  }

  modifyHeadersPosition(headers: any[]) {
    headers = headers.filter((header: any) => header.show && (header?.canShow));
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

activateCaret(header: string, sortOrder: string) {
  $(".caret").removeClass("active");
  const directionCaretClass =
      sortOrder == "asc" ? ".up-caret" : ".down-caret";
  $(`.caret.caret-${header}${directionCaretClass}`).addClass("active");
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

changeShowingHeaders(event: { column: any, isChecked: boolean }){
  this.allHeaders.forEach(header => {
      if(header.field == event.column.field)
          header.canShow = event.isChecked;
  });
  this.headers = this.modifyHeadersPosition(this.allHeaders);
}

selectComment(record){}

initTooltips() {
  setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip();
  }, 500);

  setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip();
  }, 2500);
}

addFilter(filter: any) {
  const filterKeys = Object.keys(filter);
  filterKeys.forEach((key: any) => {
      this.filters[key] = filter[key];
  });
  this.loadFeedsData();
}

removeFilter(filterObj: { field: string }) {
  delete this.filters[filterObj.field];
  this.loadFeedsData();
}
reset() {
  this.headers.forEach((header: any) => (header.sortOrder = "desc"));
  // this.isEditingComment = false;
  // this.commentBoxCtrl.reset();
}

}
