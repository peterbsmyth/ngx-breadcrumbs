import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Component, Injectable, OnDestroy } from '@angular/core';
import { utils } from '../shared/utils';
import { BrowseService, IFolder } from './browse.service';

import { BrowseBreadcrumbsResolver } from './browse-breadcrumbs.resolver';

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



