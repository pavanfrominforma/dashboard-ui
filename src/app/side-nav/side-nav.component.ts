import { Component, OnInit } from "@angular/core";
import * as bootstrap from "bootstrap";
import { ApiService } from "../services/api.service";
import { CommonService } from "../services/common.service";
import { LocalService } from "../services/local.service";
declare var $: any;
@Component({
    selector: "app-side-nav",
    templateUrl: "./side-nav.component.html",
    styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
    feedTypes: string[];
    isSideBarOpen: boolean;

    constructor(
        private apiService: ApiService,
        private commonService: CommonService,
        private localService: LocalService
    ) {}
    ngOnInit(): void {
        this.commonService.showLoader();
        this.feedTypes = ["PI", "CLASS"];
        this.initialize();
        this.loadVdpFeedTypes();
        this.toggleNavbar(false);
    }
    loadVdpFeedTypes() {
        this.apiService.getVdpFeedsCount().subscribe({
            next: (response: any) => {
                this.feedTypes = response.map((feed: any) => feed.feedtype);
                console.log(response);
            },
            complete: () => this.commonService.hideLoader(),
        });
    }

    encodeLink(link: string) {
        return encodeURIComponent(link);
    }

    toggleNavbar(status = true) {
        if (!status) {
            const open = this.localService.isNavOpen();
            this.isSideBarOpen = open;
            if (open) $("#sidebar").removeClass("closed");
            else $("#sidebar").addClass("closed");
        } else {
            this.localService.toggleNavPostion();
            const open = this.localService.isNavOpen();
            this.isSideBarOpen = open;
            if (open) $("#sidebar").removeClass("closed");
            else $("#sidebar").addClass("closed");
        }
    }
    initialize() {
        document.addEventListener("DOMContentLoaded", () => {
             
            $(".toggle-sidebar").on("click", () => {
                this.toggleNavbar();
            });
            $("#sidebar ul.submenu").on("click", (e: any) => {
                console.log("Event ", $(e.target).siblings("a.nav-link"));
                $("#sidebar .nav-item a.nav-link").removeClass("nav-active");
                $(e.target).parent().parent().siblings().addClass("nav-active");
            });

            $(".nav-item.has-submenu > a.nav-link").on('click', (e: any) => {
                const dropdown = $(e.currentTarget).siblings(".submenu");
                const currentState = $(dropdown).css('display') == 'none';
                const isHidden = !currentState;
                const toggleRight = $(e.currentTarget).parent().find(".bi-caret-right-fill");
                const toggleDown = $(e.currentTarget).parent().find(".bi-caret-down-fill");

                if(isHidden){
                    $(toggleRight).hide();
                    $(toggleDown).show();
                }else{
                    $(toggleRight).show();
                    $(toggleDown).hide();
                }
                $(dropdown).slideToggle("fast");

            })

        });
    }
}
