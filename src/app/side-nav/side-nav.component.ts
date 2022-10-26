import { Component, OnInit } from "@angular/core";
import * as bootstrap from "bootstrap";

@Component({
    selector: "app-side-nav",
    templateUrl: "./side-nav.component.html",
    styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        this.initialize();
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
