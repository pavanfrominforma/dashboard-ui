import {
    Component,
    OnInit,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
} from "@angular/core";
import * as $ from "jquery";

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit, AfterViewInit {
    @Input("columns") tableColumns: any[];
    @Input("filters") filters: any;
    @Output("onFilterAdded") onFilterAdded: EventEmitter<any>;
    @Output("onFilterRemoved") onFilterRemoved: EventEmitter<any>;

    constructor() {
        this.onFilterAdded = new EventEmitter();
        this.onFilterRemoved = new EventEmitter();
    }

    ngOnInit(): void {}

    applyCurrentFilter(currentFilter: any) {
        console.log("Current  filter is ", currentFilter);
        this.onFilterAdded.emit(currentFilter);
    }

    removeFilter(filterObj: { field: string }) {
        this.onFilterRemoved.emit(filterObj);
    }

    ngAfterViewInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges): void{
        this.initViewDrops();
    }

    initViewDrops(){
        setTimeout(() => {
            $(".filters .dropdown-menu .dropdown-menu-main-li").on(
                "click",
                (e: any) => {
                    e.stopPropagation();
                    console.log("Event is ", e);
                    const dropdownSubmenu = $(e.currentTarget).siblings(
                        ".dropdown-submenu"
                    );
                    const all = $(".dropdown-menu-main-li").siblings(
                        ".dropdown-submenu"
                    );
                    $(all).removeClass("show");
                    $(all).addClass("hide");
                    if (dropdownSubmenu) {
                        // dropdownSubmenu.toggle();
                        $(".dropdown-submenu").addClass("hide");
                        dropdownSubmenu.removeClass("hide");
                        dropdownSubmenu.addClass("show");
                    }
                }
            );

            // $('.dropdown').on('focusout', (e: any) => {
            //   console.log("TGT ", e.currentTarget, e);
            //   if($(e.currentTarget).hasClass('dropdown'))
            //     return;
            //   console.log('E ', e);
            //   $(".dropdown-submenu").removeClass('show');
            //   $(".dropdown-submenu").addClass('hide');

            // })
        }, 100);
    }
}
