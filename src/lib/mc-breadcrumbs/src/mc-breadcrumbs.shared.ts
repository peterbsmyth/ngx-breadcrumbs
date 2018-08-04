import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, from } from 'rxjs';

// Angular makes it impossible to make modules optional :(

// try {
//   const _ = r('lodash');
//   _template = _.template;
//   _templateSettings = _.templateSetting
// } catch (e) {
//   try {
//     _template = r('lodash.template');
//     _templateSettings = r('lodash.templatesettings');
//   } catch (e) {
//     _template = (y) => (x) => y;
//     _templateSettings = {};
//   }
// } finally {
//   _templateSettings.interpolate = /{{([\s\S]+?)}}/g;
// }

import * as template from 'lodash.template';
import * as templateSettings from 'lodash.templatesettings';

const _ = {
  template: template,
  templateSettings: templateSettings
};

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export interface IBreadcrumb {
  text: string;
  path: string;
}

declare var require: any;

function r(module) {
  return require(`${name}`);
}

export function stringFormat(template: string, binding: any): string {
  const compiled = _.template(template);
  return compiled(binding);
}

export function isPromise(value: any): boolean {
  return value && (typeof value.then === 'function');
}

export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>)
  : Observable<T> {

  if (value instanceof Observable) {
    return value;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }

  return of(value as T);
}
