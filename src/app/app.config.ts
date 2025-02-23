import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";

import { MainPageWrapperComponent } from "./main-components/main-page-wrapper/main-page-wrapper.component";
import { AuthorPageComponent } from "./main-components/author-page/author-page.component";
import { TeamPageComponent } from "./main-components/team-page/team-page.component";
import { ArtworkPageComponent } from "./main-components/artwork-page/artwork-page.component";

export const routes: Routes = [
  { path: "", component: MainPageWrapperComponent },
  { path: "author/:id", component: AuthorPageComponent },
  { path: "author-teams/:id", component: TeamPageComponent },
  { path: "composition/:id", component: ArtworkPageComponent },
  { path: "**", component: MainPageWrapperComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
