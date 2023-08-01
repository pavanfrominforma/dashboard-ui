import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { LlfinComponent } from "./pages/llfin/llfin.component";
import { PscComponent } from "./pages/psc/psc.component";
import { SanctionsComponent } from "./pages/sanctions/sanctions.component";
import { FeedsComponent } from "./subcomps/feeds/feeds.component";
import { CallingsLoaderComponent } from "./pages/callings-loader/callings-loader.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

const routes: Routes = [
    {
    path: "",
        component: MainPageComponent,
        children: [
            {
                path: '',
				redirectTo: "dashboard",
				pathMatch: 'full',
            },
            {
                path: "dashboard",
                component: DashboardComponent,
                pathMatch: "full"
            },
            {
                path: "vdp",
                children: [
                    { path: "feeds/:feedtype", component: FeedsComponent },
                ],
            },
            {
                path: "psc/feeds",
                component: PscComponent
            },
            {
                path: "sanctions/feeds",
                component: SanctionsComponent
            },
            {
                path: "llfin/feeds",
                component: LlfinComponent
            },
            {
                path: "callings-loader/feeds",
                component: CallingsLoaderComponent
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
