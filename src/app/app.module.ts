
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';




import { McBreadcrumbsModule, McBreadcrumbsConfig } from 'ngx-breadcrumbs';

import { AboutComponent } from './components/about.component';
import { HomeComponent } from "./components/home.component";
import { AppComponent } from './app.component';
import { BrowseComponent } from "./browse/browse.component";
import { BrowseService } from './browse/browse.service';
import { BrowseBreadcrumbsResolver } from './browse/browse-breadcrumbs.resolver';


import { routes } from './shared/app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    McBreadcrumbsModule.forRoot()
  ],
  declarations: [AppComponent, AboutComponent, BrowseComponent, HomeComponent],
  bootstrap: [AppComponent],
  providers: [
    BrowseService, BrowseBreadcrumbsResolver
  ]
})
export class AppModule {
  constructor(breadcrumbsConfig: McBreadcrumbsConfig) {

    breadcrumbsConfig.postProcess = (x) => {

      // Ensure the first breadcrumb points to home

      let y = x;

      if(x.length && x[0].text !== 'Home') {
        y = [
          {
            text: 'Home',
            path: ''
          }
        ].concat(x);
      }

      return y;
    };
  }
}
