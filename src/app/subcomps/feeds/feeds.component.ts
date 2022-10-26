import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
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

  constructor(private apiService: ApiService) {
    this.overallData = [];
    this.headers = [];
    this.data = [];
  }

  ngOnInit(): void {
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
    console.log('Page number ', pageNumber);

    pageNumber = Math.max(pageNumber, 0);
    pageNumber = Math.min(pageNumber, this.pagination.totalPages - 1);
    this.pagination.pageNumber = pageNumber;
    console.log('Page number ', pageNumber);
    let startIndex = pageNumber * this.pagination.maxRecordsPerPage;
    let endIndex =
      pageNumber * this.pagination.maxRecordsPerPage +
      this.pagination.maxRecordsPerPage;
    console.log(startIndex, ' ==> ', endIndex);
    this.data = this.overallData.slice(startIndex, endIndex);
  }

  modifyHeadersPosition(headers: any[]) {
    let positionMap = {} as any;
    for (let header of headers) {
      const key = header?.position || '';
      if (!positionMap[key]) positionMap[key] = [];
      positionMap[key].push(header);
    }

    let firsts = positionMap['first'] || [];
    let lasts = positionMap['last'] || [];
    delete positionMap['first'];
    delete positionMap['last'];

    let results = [...firsts];
    for (let obj of Object.values(positionMap))
      results = [...results, ...(obj as any)];

    return [...results, ...lasts];
  }
}
