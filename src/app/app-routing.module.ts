import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { FeedsComponent } from "./subcomps/feeds/feeds.component";

const routes: Routes = [
    {
        path: "",
        component: MainPageComponent,
        children: [
            {
                path: "vdp",
                children: [{ path: "feeds", component: FeedsComponent }],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
