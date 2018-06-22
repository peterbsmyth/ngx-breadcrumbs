import { Injectable, Injector } from '@angular/core';

import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

import { Observable, BehaviorSubject, of } from 'rxjs';
import {
  flatMap,
  distinct,
  toArray,
  concat,
  first,
  filter
} from 'rxjs/operators';

import { IBreadcrumb, wrapIntoObservable } from '../mc-breadcrumbs.shared';
import { McBreadcrumbsConfig } from './mc-breadcrumbs.config';
import { McBreadcrumbsResolver } from './mc-breadcrumbs.resolver';

@Injectable()
export class McBreadcrumbsService {
  private _breadcrumbs = new BehaviorSubject<IBreadcrumb[]>([]);
  private _defaultResolver = new McBreadcrumbsResolver();

  constructor(
    private _router: Router,
    private _config: McBreadcrumbsConfig,
    private _injector: Injector
  ) {
    this._router.events
      .pipe(filter(x => x instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const route = _router.routerState.snapshot.root;

        this._resolveCrumbs(route)
          .pipe(
            flatMap(x => x),
            distinct(x => x.text),
            toArray(),
            flatMap(x => {
              if (this._config.postProcess) {
                const y = this._config.postProcess(x);
                return wrapIntoObservable<IBreadcrumb[]>(y).pipe(first());
              } else {
                return of(x);
              }
            })
          )

          .subscribe(x => {
            this._breadcrumbs.next(x);
          });
      });
  }

  get crumbs$(): Observable<IBreadcrumb[]> {
    return this._breadcrumbs;
  }

  private _resolveCrumbs(
    route: ActivatedRouteSnapshot
  ): Observable<IBreadcrumb[]> {
    let crumbs$: Observable<IBreadcrumb[]>;

    const data = route.routeConfig && route.routeConfig.data;

    if (data && data.breadcrumbs) {
      let resolver: McBreadcrumbsResolver;

      if (data.breadcrumbs.prototype instanceof McBreadcrumbsResolver) {
        resolver = this._injector.get(data.breadcrumbs);
      } else {
        resolver = this._defaultResolver;
      }

      const result = resolver.resolve(route, this._router.routerState.snapshot);
      crumbs$ = wrapIntoObservable<IBreadcrumb[]>(result).pipe(first());
    } else {
      crumbs$ = of([]);
    }

    if (route.firstChild) {
      crumbs$ = crumbs$.pipe(concat(this._resolveCrumbs(route.firstChild)));
    }

    return crumbs$;
  }
}
