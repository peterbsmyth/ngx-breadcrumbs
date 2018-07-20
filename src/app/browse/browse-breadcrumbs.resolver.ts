import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrowseService } from './browse.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { IBreadcrumb, McBreadcrumbsResolver } from 'ngx-breadcrumbs';
import { map } from 'rxjs/operators';

@Injectable()
export class BrowseBreadcrumbsResolver extends McBreadcrumbsResolver {
  constructor(private service: BrowseService) {
    super();
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBreadcrumb[]> {
    const id = route.params.id;

    return this.service.getPath(id).pipe(
      map(folders =>
        folders.map(folder => ({
          text: folder.name,
          path: super.getFullPath(route.parent) + '/' + folder.id
        }))
      )
    );
  }
}
