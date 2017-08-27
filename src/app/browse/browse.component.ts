import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Component, Injectable, OnDestroy } from '@angular/core';
import { utils } from '../shared/utils';
import { BrowseService, IFolder } from './browse.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BrowseBreadcrumbsResolver } from "./browse-breadcrumbs.resolver";

////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: './browse.component.html'
})
export class BrowseComponent implements OnDestroy {

  folders: Observable<IFolder[]>;
  subscriptions = new Array<Subscription>();

  constructor(private service: BrowseService, route: ActivatedRoute) {

    const s = route.params.subscribe((x) => {
      const parentId = x.id || null;
      this.folders = this.service.getChilds(parentId);
    });

    this.subscriptions.push(s);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}



