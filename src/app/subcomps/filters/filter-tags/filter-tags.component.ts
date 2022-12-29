import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-filter-tags",
    templateUrl: "./filter-tags.component.html",
    styleUrls: ["./filter-tags.component.scss"],
})
export class FilterTagsComponent implements OnInit {
    @Input("filterKVPair") filterKVPair: any;
    @Output("onFilterRemoved") onFilterRemoved: EventEmitter<any>;

    constructor() {
        this.onFilterRemoved = new EventEmitter();
    }

    ngOnInit(): void {}

    removeFilter() {
        this.onFilterRemoved.emit({ field: this.filterKVPair.key });
    }
}
