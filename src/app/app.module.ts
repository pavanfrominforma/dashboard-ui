import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TopNavComponent } from "./top-nav/top-nav.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { FeedsComponent } from "./subcomps/feeds/feeds.component";
import { FeedCountsSliderComponent } from "./subcomps/feed-counts-slider/feed-counts-slider.component";
import { MainLoaderComponent } from "./main-loader/main-loader.component";

@NgModule({
    declarations: [
        AppComponent,
        TopNavComponent,
        SideNavComponent,
        MainPageComponent,
        FeedsComponent,
        FeedCountsSliderComponent,
        MainLoaderComponent,
    ],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
