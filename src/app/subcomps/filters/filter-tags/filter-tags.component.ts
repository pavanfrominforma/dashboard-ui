import { Component, EventEmitter, Input, OnInit, Output, AfterContentInit } from "@angular/core";
import * as moment from "moment";

@Component({
    selector: "app-filter-tags",
    templateUrl: "./filter-tags.component.html",
    styleUrls: ["./filter-tags.component.scss"],
})
export class FilterTagsComponent implements OnInit, AfterContentInit {
    @Input("filterKVPair") filterKVPair: any;
    @Output("onFilterRemoved") onFilterRemoved: EventEmitter<any>;

    key: any;
    value: any;
    condition: string;

    constructor() {
        this.onFilterRemoved = new EventEmitter();
        console.log("Filter KV Pair ", this.filterKVPair);
        
    }

    isString(value: any){
        return typeof value == 'string';
    }

    isDate(valueObj: any) {
        let obj = valueObj;
        return (
            obj &&
            obj instanceof Object &&
            (obj.hasOwnProperty("startDate") || obj.hasOwnProperty("endDate"))
        );
    }

    buildConditionForDate(dateObj: any){
        let v = "";
        const format = "DD/MM/YYYY"

        let sd = dateObj?.startDate ? moment(dateObj.startDate).format(format): null;
        let ed = dateObj?.endDate ? moment(dateObj.endDate).format(format): null;

        if(ed && sd) {
            this.condition = 'between';
            v = `${sd} - ${ed}`;
        }
        else if(ed && !sd){
            v = `${ed}`;
            this.condition = 'till';
        }
        else if(sd && !ed){
            v = `${sd}`;
            this.condition = 'from';
        }
        return v;
    }

    ngOnInit(): void {}

    ngAfterContentInit(): void {
        const k = this.filterKVPair?.key;
        const v = this.filterKVPair?.value;
        this.key = k;
        this.value = v;
        console.log("Si string ", v, " => ", typeof(v), " => ", this.isString(v))
        if(this.isString(v)){
            this.key = k;
            this.value = v;
            this.condition = 'contains'
        }
        else if (this.isDate(v)) {
            this.value = this.buildConditionForDate(v);
        }           
    }
    removeFilter() {
        this.onFilterRemoved.emit({ field: this.filterKVPair.key });
    }
}
