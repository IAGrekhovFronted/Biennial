import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";

import { MainPageWrapperComponent } from "./main-components/main-page-wrapper/main-page-wrapper.component";
import { AuthorPageComponent } from "./main-components/author-page/author-page.component";

export const routes: Routes = [
  { path: "", component: MainPageWrapperComponent },
  { path: "author/:id", component: AuthorPageComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
