import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { IBreadcrumb, stringFormat } from '../mc-breadcrumbs.shared';
import { Observable, of } from 'rxjs';


export class McBreadcrumbsResolver implements Resolve<IBreadcrumb[]> {
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
     : Observable<IBreadcrumb[]> | Promise<IBreadcrumb[]> | IBreadcrumb[] {

    const data = route.routeConfig.data;
    const path = this.getFullPath(route);

    let text = typeof (data.breadcrumbs) === 'string' ? data.breadcrumbs : data.breadcrumbs.text || data.text || path;
    text = stringFormat(text, route.data);

    const crumbs: IBreadcrumb[] = [{
      text: text,
      path: path
    }];

    return of(crumbs);
  }

  public getFullPath(route: ActivatedRouteSnapshot): string {
    const relativePath = (segments: UrlSegment[]) => segments.reduce((a, v) => a += '/' + v.path, '');
    const fullPath = (routes: ActivatedRouteSnapshot[]) => routes.reduce((a, v) => a += relativePath(v.url), '');

    return fullPath(route.pathFromRoot);
  }
}
