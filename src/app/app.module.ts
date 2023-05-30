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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FiltersComponent } from "./subcomps/filters/filters.component";
import { FilterControlsComponent } from "./subcomps/filters/filter-controls/filter-controls.component";
import { FilterTagsComponent } from "./subcomps/filters/filter-tags/filter-tags.component";
import { TableColumnsComponent } from './subcomps/table-columns/table-columns.component';
import { PscComponent } from './pages/psc/psc.component';
import { SanctionsComponent } from './pages/sanctions/sanctions.component';
import { LlfinComponent } from './pages/llfin/llfin.component';

@NgModule({
    declarations: [
        AppComponent,
        TopNavComponent,
        SideNavComponent,
        MainPageComponent,
        FeedsComponent,
        FeedCountsSliderComponent,
        MainLoaderComponent,
        FiltersComponent,
        FilterControlsComponent,
        FilterTagsComponent,
        TableColumnsComponent,
        PscComponent,
        SanctionsComponent,
        LlfinComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
