import { Observable, Subscription } from 'rxjs';
import { McBreadcrumbsService } from '../service/mc-breadcrumbs.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBreadcrumb } from '../mc-breadcrumbs.shared';

@Component({
  selector: 'mc-breadcrumbs',
  templateUrl: './mc-breadcrumbs.component.html'
})
export class McBreadcrumbsComponent implements OnInit, OnDestroy {
  constructor(public service: McBreadcrumbsService) {}

  crumbs: IBreadcrumb[];

  subscriptions = new Array<Subscription>();

  public ngOnInit(): void {

    const s = this.service.crumbs$.subscribe((x) => {
      this.crumbs = x;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

}
