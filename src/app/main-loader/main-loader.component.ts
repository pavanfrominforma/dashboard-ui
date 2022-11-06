import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "../services/common.service";

@Component({
    selector: "app-main-loader",
    templateUrl: "./main-loader.component.html",
    styleUrls: ["./main-loader.component.scss"],
})
export class MainLoaderComponent implements OnInit {
    isLoading: boolean = false;

    constructor(private commonService: CommonService) {
        this.commonService
            .getLoaderAsObservable()
            .subscribe((status: boolean) => (this.isLoading = status));
    }

    ngOnInit(): void {}
}
