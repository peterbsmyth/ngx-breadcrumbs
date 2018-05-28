import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { IBreadcrumb } from '../mc-breadcrumbs.shared';

export interface IPostProcessFunc {
  (crumbs: IBreadcrumb[]) : Promise<IBreadcrumb[]> | Observable<IBreadcrumb[]> | IBreadcrumb[];
}

@Injectable()
export class McBreadcrumbsConfig {
  postProcess : IPostProcessFunc
}
