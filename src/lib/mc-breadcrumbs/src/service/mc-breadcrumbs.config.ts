import { Injectable } from '@angular/core';
import { IBreadcrumb } from "../mc-breadcrumbs.shared";

@Injectable()
export class McBreadcrumbsConfig {

  private _prefixCrumbs : IBreadcrumb[] = [];

  set prefixCrumbs(value: IBreadcrumb[]) {
    this._prefixCrumbs = [].concat(value);
  }

  get prefixCrumbs() : IBreadcrumb[] {
    return this._prefixCrumbs;
  }
}
