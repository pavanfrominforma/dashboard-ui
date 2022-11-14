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

            $(".nav-item.has-submenu").on('click', (e: any) => {
                e.preventDefault();
                console.log(e.target)
                
                // const isNavLink = $(e.target).hasClass("nav-link");
                if(e.target == e.currentTarget ) return;
                console.log("E ELements ", e.target, " Target ", e.currentTarget);
                const parent = $('.nav-item.has-submenu');
                const collapseElements = $(parent).find(".submenu.collapse");
                const currentChild = $(e.currentTarget).find(".submenu.collapse");

                const allToggleRights = $(parent).find(".bi-caret-right-fill");
                const allToggleDowns = $(parent).find(".bi-caret-down-fill");

                const toggleRight = $(e.currentTarget).find(".bi-caret-right-fill")
                const toggleDown = $(e.currentTarget).find(".bi-caret-down-fill")
            
                const isAlreadyShowing = $(currentChild[0]).hasClass('show');

                $(allToggleRights).hide();
                $(allToggleDowns).show();

                const collapseItems = collapseElements.toArray().map((cur: any) => {
                    const collapse = new bootstrap.Collapse(cur, {toggle: false});
                    return collapse;
                })
                collapseItems.forEach((l: any) => l.hide());
                const currentCollapseItem = new bootstrap.Collapse(currentChild[0], {toggle: false});
                if(isAlreadyShowing){
                    $(toggleRight).hide();
                    $(toggleDown).show();
                    currentCollapseItem.hide();
                }
                else{ 
                    $(toggleDown).hide();
                    $(toggleRight).show();
                    currentCollapseItem.show(); 
                }
            });

        });
    }
}
