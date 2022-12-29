import {
    Component,
    OnInit,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    FilterControlProps,
    FilterControlType as TypeEnums,
} from "../../../utils/types";
import * as moment from "moment";

@Component({
    selector: "app-filter-controls",
    templateUrl: "./filter-controls.component.html",
    styleUrls: ["./filter-controls.component.scss"],
})
export class FilterControlsComponent implements OnInit, AfterViewInit {
    @Input("controlProps") controlProps: FilterControlProps;
    @Output("onFilterAdded") onFilterAdded: EventEmitter<any>;

    FilterControlType = TypeEnums;

    textInput: FormControl;
    booleanFormGroup: FormGroup;
    startDateInput: FormControl;
    endDateInput: FormControl;

    constructor() {
        this.onFilterAdded = new EventEmitter();
        this.textInput = new FormControl();
        this.booleanFormGroup = new FormGroup({
            booleanInput: new FormControl(),
        });
        this.startDateInput = new FormControl(null);
        this.endDateInput = new FormControl(null);
    }

    ngOnInit(): void {
        console.log(
            "Control props -- " +
                this.controlProps.name +
                " ==> " +
                this.controlProps.datatype +
                " --> " +
                (this.controlProps.datatype == TypeEnums.STRING)
        );
    }

    ngAfterViewInit(): void {
        $(".filters-controls").on("click", (e: any) => {
            e.stopPropagation();
        });
    }

    applyFilters() {
        const filters = this.getFilterValues();
        console.log("Filters ", filters);
        if (!filters) return;
        this.onFilterAdded.emit(filters);
        this.reset();
        this.close();
    }

    cancel() {
        this.reset();
        this.close();
    }

    reset() {
        this.textInput.reset();
        this.booleanFormGroup.reset();
        this.startDateInput.reset();
        this.endDateInput.reset();
    }

    close() {
        const allFilters = $(".dropdown-menu-main-li").siblings(
            ".dropdown-submenu"
        );
        allFilters.removeClass("show");
        allFilters.addClass("hide");
    }

    getFilterValues() {
        if (this.controlProps.datatype == TypeEnums.STRING)
            return {
                [this.controlProps.field]: this.textInput.value,
            };

        if (this.controlProps.datatype == TypeEnums.BOOLEAN)
            return {
                [this.controlProps.field]: this.booleanFormGroup.value,
            };

        if (this.controlProps.datatype == TypeEnums.DATE) {
            let sd =
                this.startDateInput.value != null
                    ? moment(this.startDateInput.value)
                          .startOf("day")
                          .toISOString()
                    : null;
            let ed =
                this.endDateInput.value != null
                    ? moment(this.endDateInput.value).endOf("day").toISOString()
                    : null;

            return {
                [this.controlProps.field]: {
                    startDate: sd,
                    endDate: ed,
                },
            };
        }

        return null;
    }
}
