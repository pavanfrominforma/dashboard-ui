import { Component, OnInit } from "@angular/core";
import * as bootstrap from "bootstrap";
import { ApiService } from "../services/api.service";

@Component({
    selector: "app-side-nav",
    templateUrl: "./side-nav.component.html",
    styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
    feedTypes: string[];

    constructor(private apiService: ApiService) {}
    ngOnInit(): void {
        this.feedTypes = ["PI", "CLASS"];
        this.initialize();
        this.loadVdpFeedTypes();
    }
    loadVdpFeedTypes() {
        this.apiService.getVdpFeedsCount().subscribe({
            next: (response: any) => {
                this.feedTypes = response.map((feed: any) => feed.feedtype);
                console.log(response);
            },
        });
    }

    encodeLink(link: string) {
        return encodeURIComponent(link);
    }
    initialize() {
        document.addEventListener("DOMContentLoaded", function () {
            document
                .querySelectorAll("#sidebar .nav-link")
                .forEach(function (element) {
                    element.addEventListener("click", function (e) {
                        let nextEl = element.nextElementSibling as any;
                        let parentEl = element.parentElement as any;

                        if (
                            nextEl &&
                            parentEl.classList.contains("has-submenu")
                        ) {
                            e.preventDefault();

                            if (nextEl.classList.contains("show")) {
                                let mycollapse = new bootstrap.Collapse(nextEl);
                                mycollapse.hide();
                            } else {
                                let mycollapse = new bootstrap.Collapse(nextEl);

                                mycollapse.show();
                                // find other submenus with class=show
                                var opened_submenu =
                                    parentEl.parentElement.querySelector(
                                        ".submenu.show"
                                    );
                                // if it exists, then close all of them
                                if (opened_submenu) {
                                    new bootstrap.Collapse(opened_submenu);
                                }
                            }
                        }
                    }); // addEventListener
                }); // forEach
        });
    }
}
