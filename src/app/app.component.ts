
import { Route, Router } from '@angular/router';
import { Component } from '@angular/core';

export interface INavLink {
  text: string,
  path: string,
  exact: boolean
}

@Component({
  selector: 'app-root',
  template: `
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <ul class="navbar-nav">
            <li *ngFor="let link of navLinks" class="nav-item"
              [routerLinkActive]="['active']"
              [routerLinkActiveOptions]="link">
              <a class="nav-link" routerLink="{{ link.path }}">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container">
        <mc-breadcrumbs></mc-breadcrumbs>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .navbar {
        margin-bottom: 20px;
      }
    `
  ]
})
export class AppComponent {

  navLinks: INavLink[] = new Array<INavLink>();

  constructor(router: Router) {
    // this.navLinks = router.config.filter((x) => x.data && x.data.nav).map((x) => ({
    //   text: x.data.nav.text || x.data.text,
    //   path: x.data.nav.path || x.path,
    //   exact: x.data.nav.exact
    // }));

    this.getNavLinks(router.config);
  }

  getNavLinks(routes: Route[]) {

    this.navLinks.push(...
      routes.filter((x) => x.data && x.data.nav).map((x) => ({
        text: x.data.nav.text || x.data.text,
        path: x.data.nav.path || x.path,
        exact: x.data.nav.exact
      })));

    routes.forEach((x) => {
      if(x.children) {
        this.getNavLinks(x.children);
      }
    })
  }
}
