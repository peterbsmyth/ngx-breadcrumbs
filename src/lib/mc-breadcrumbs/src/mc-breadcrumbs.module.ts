import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { McBreadcrumbsService } from './service/mc-breadcrumbs.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { McBreadcrumbsComponent } from "./component/mc-breadcrumbs.component";
import { McBreadcrumbsConfig } from "./service/mc-breadcrumbs.config";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ McBreadcrumbsComponent ],
  exports: [ McBreadcrumbsComponent ]
})
export class McBreadcrumbsModule {
  static forRoot() : ModuleWithProviders {
    return {
      ngModule: McBreadcrumbsModule,
      providers: [
        McBreadcrumbsService,
        McBreadcrumbsConfig
      ]
    };
  }
}
