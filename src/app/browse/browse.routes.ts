import { BrowseComponent } from "./browse.component";
import { BrowseBreadcrumbsResolver } from "./browse-breadcrumbs.resolver";

const browseRoutes = [
  {
    path: '',
    component: BrowseComponent
  },
  {
    path: ':id',
    component: BrowseComponent,
    data: {
      breadcrumbs: BrowseBreadcrumbsResolver
    }
  }
];

export { browseRoutes }
