import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BrowseService } from './browse.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IBreadcrumb, McBreadcrumbsResolver } from 'ngx-breadcrumbs';

@Injectable()
export class BrowseBreadcrumbsResolver extends McBreadcrumbsResolver {

  constructor(private service: BrowseService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBreadcrumb[]> {

    const id = route.params.id;

    return this.service.getPath(id)
      .map((folders) =>
        folders.map((folder) => ({
            text: folder.name,
            path: super.getFullPath(route.parent) + '/' + folder.id
          })
      ));
  }
}
