import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-feed-counts-slider",
    templateUrl: "./feed-counts-slider.component.html",
    styleUrls: ["./feed-counts-slider.component.scss"],
})
export class FeedCountsSliderComponent implements OnInit {
    @Input("dataList") dataList: any[];
    @Input('loading') isLoading = true;

    constructor() {}

    ngOnInit(): void {
        console.log("Feeds count ", this.dataList);
    }

    scrollRight() {
        const container = document.getElementsByClassName("slider-row")[0];
        const rightSlider = document.getElementsByClassName("right-slider")[0];
        const leftSlider = document.getElementsByClassName("left-slider")[0];

        let scrolledLength = 0;
        const containerWidth = container.clientWidth;

        const sliderInterval = setInterval(() => {
            container.scrollLeft += 1;
            scrolledLength += 1;

            if (containerWidth < container.scrollLeft)
                rightSlider.classList.add("hide");
            else rightSlider.classList.remove("hide");

            if (container.scrollLeft < 100) leftSlider.classList.add("hide");
            else leftSlider.classList.remove("hide");

            if (scrolledLength > 150) clearInterval(sliderInterval);
        }, 5);
    }

    scrollLeft() {
        const container = document.getElementsByClassName("slider-row")[0];
        const leftSlider = document.getElementsByClassName("left-slider")[0];
        const rightSlider = document.getElementsByClassName("right-slider")[0];

        let scrolledLength = 0;
        const containerWidth = container.clientWidth;

        const sliderInterval = setInterval(() => {
            container.scrollLeft -= 1;
            scrolledLength += 1;

            if (container.scrollLeft < 100) leftSlider.classList.add("hide");
            else leftSlider.classList.remove("hide");

            if (containerWidth > container.scrollLeft)
                rightSlider.classList.remove("hide");
            else rightSlider.classList.add("hide");

            if (scrolledLength > 150) clearInterval(sliderInterval);
        }, 5);
    }
}
