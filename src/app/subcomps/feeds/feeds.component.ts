import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {

  headers: any[];
  data: any[];

  constructor() { 
    this.headers = [
      {
        name: "Feed name",
        field: "feedName",
        position: 'first',
      },
      {
        name: "Feed path",
        field: "feedPath"
      },
      {
        name: "Feed status",
        field: "feedStatus",
        position: 'last'

      },
      {
        name: "Active date",
        field: "activeDate",
      },
      {
        name: "Modified date",
        field: "modifiedDate"
      },
      {
        name: "New date",
        field: "modifiedDate"
      },
      {
        name: "Latest date",
        field: "modifiedDate"
      }
    ]

    this.data = [
      {
        feedName: "PI_SH",
        feedPath: "D:\\IBL_SCORCH\\INTERNAL\\VDP\\PICLUB\\PI_SH",
        feedStatus: "Active",
        activeDate: new Date().toDateString(),
        modifiedDate: new Date().toDateString()
      },
      {
        feedName: "PI_BR",
        feedPath: "D:\\IBL_SCORCH\\INTERNAL\\VDP\\PICLUB\\PI_BR",
        feedStatus: "Active",
        activeDate: new Date().toDateString(),
        modifiedDate: new Date().toDateString()
      },
      {
        feedName: "PI_SM",
        feedPath: "D:\\IBL_SCORCH\\INTERNAL\\VDP\\PICLUB\\PI_SM",
        feedStatus: "Active",
        activeDate: new Date().toDateString(),
        modifiedDate: new Date().toDateString()
      },
      {
        feedName: "CHENNAI",
        feedPath: "D:\\IBL_SCORCH\\INTERNAL\\VDP\\Chennai",
        feedStatus: "Active",
        activeDate: new Date().toDateString(),
        modifiedDate: new Date().toDateString()
      },
      {
        feedName: "Manglore",
        feedPath: "D:\\IBL_SCORCH\\INTERNAL\\VDP\\Manglore",
        feedStatus: "Active",
        activeDate: new Date().toDateString(),
        modifiedDate: new Date().toDateString()
      }
    ]
  }

  ngOnInit(): void {
    this.headers = this.modifyHeadersPosition(this.headers)
    console.log(this.headers)
  }

  modifyHeadersPosition(headers: any[]){
    let positionMap = {} as any;
    for(let header of headers){
      const key = (header?.position || '');
      if(!positionMap[key])
        positionMap[key] = [];
      positionMap[key].push(header);
    }

    let firsts = positionMap['first'] || [];
    let lasts = positionMap['last'] || [];
    delete positionMap['first'];
    delete positionMap['last'];

    let results = [...firsts]
    for(let obj of Object.values(positionMap))
      results = [...results, ...obj as any]

    return [...results, ...lasts];
  }

}
