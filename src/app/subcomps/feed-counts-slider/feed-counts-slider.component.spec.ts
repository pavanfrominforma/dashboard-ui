import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FeedCountsSliderComponent } from "./feed-counts-slider.component";

describe("FeedCountsSliderComponent", () => {
    let component: FeedCountsSliderComponent;
    let fixture: ComponentFixture<FeedCountsSliderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeedCountsSliderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FeedCountsSliderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
