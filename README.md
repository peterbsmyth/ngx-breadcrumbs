# Ngx-Breadcrumbs
An Angular (4+) module generating breadcrumbs based on the routing state.

## Installation
```bash
# install via npm
$ npm --save install ngx-breadcrumbs
```
```bash
# install via yarn
$ yarn add ngx-breadcrumbs
```

## Usage

Import the `McBreadcrumbsModule` in your root module (`app.module.ts`) after 
importing the _router_ module. 

```javascript
import { RouterModule } from '@angular/router';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';

@NgModule({
  imports: [
    RouterModule.forRoot(myRoutes),
    McBreadcrumbsModule.forRoot()
  ],  
})
export class AppModule {}
```

Place the `mc-breadcrumbs` component, which will render the breadcrumbs, 
somewhere in your markup.

```javascript
@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <mc-breadcrumbs></mc-breadcrumbs>
      <router-outlet></router-outlet>
    </div>`
})
export class AppComponent {}
```

Usage of the `mc-breadcrumbs` render component is optional. If a different 
markup output is desired, a custom component can be created that subscribes to 
the `McBreadcrumbsService.crumbs$` observable.  

### Routing Configuration

Breadcrumbs links are generated based on the route configuration. If a route 
entry contains a `data.breadcrumbs` property the _breadcrumbs service_ assumes 
breadcrumbs should be created whenever this route or one its child routes are 
active. 

```javascript
const myRoutes : Route[] = {
  {
    path: '',
    component: HomeComponent,
    data: {
      // Uses static text (Home)
      breadcrumbs: 'Home' 
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      // Uses last urlfragment (about) as text
      breadcrumbs: true 
    }
  },
  {
    path: 'person',
    data: {
      // Uses text property (Person)
      breadcrumbs: true,
      text: 'Person'
    },
    children: [
      {
          path: '',
          component: PersonListComponent
      },
      {
          path: ':id',
          component: PersonDetailComponent,
          data: {
            // Interpolates values resolved by the router 
            breadcrumbs: '{{ person.name }}'
          },
          resolve: {
            person: PersonResolver
          }
      } 
    ]
  },    
  {
    path: 'folder',
    data: {
      // Uses static text 'Folder'
      breadcrumbs: 'Folder'
    },
    children: [
      {
      path: '',
      component: FolderComponent
      },
      {
        path: ':id',
        component: FolderComponent,
        data: {
          // Resolves the breadcrumbs for this route by
          // implementing a McBreadcrumbsResolver class.
          breadcrumbs: FolderBreadcrumbsResolver
        }
      }
    ]
  }
};
```

### API

#### IBreadcrumb
The IBreadcrumb interface defines the properties of the breadcrumb items.

```javascript
export interface IBreadcrumb {
  text: string,  // The text to display 
  path: string   // The associated path
}
```

#### McBreadcrumbsComponent
The component simply renders the list of the `IBreadcrumb` items 
provided by the `McBreadcrumbsService`. The HTML output matches that of 
[Bootstrap 4 markup](https://getbootstrap.com/docs/4.0/components/breadcrumb/). 

A custom breadcrumb component is easily created by injecting the breadcrumb 
service and iterating over the breadcrumb items. 

#### McBreadcrumbsService
The service has one public property `crumbs$`. It's an observable stream of 
`IBreadcrumb[]`, which is updated after each route change.  

#### McBreadcrumbsResolver
If needed, a custom resolver can be implemented which is activated whenever a 
certain route becomes active. This can be useful whenever the route 
configuration cannot match the desired breadcrumb hierachy. 

The signature of the resolver implements `Resolve<T>` from the 
[Angular Router](https://angular.io/api/router/Resolve) and needs to resolve an 
array of `IBreadcrumb` items. 

To associate a route with a certain resolver, it breadcrumbs data property in 
the route configuration should point to the resolver:

```javascript
const myRoutes = [
  {
    path: 'somepath',
    component: SomeComponent,
    data: {
      breadcrumbs: MyBreadcrumbsResolver
    }
  }
];
```

##### Members

```javascript
// Should resolve zero or more IBreadcrumb items.
function resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<T>|Promise<T>|T 
```

```javascript
// Helper function that returns the full path for the provided route snapshot.
function getFullPath(route: ActivatedRouteSnapshot) 
  : string
```

##### Example

```javascript
@Injectable()
export class MyBreadcrumbsResolver inherits McBreadcrumbsResolver {

  // Optional: inject any required dependencies
  constructor(private myService: MyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    const myFolderId = route.params.id;
    const myCrumbs = 
      this.myService.getFolders(myFolderId)
                    .map((folder) => ({
                      text: folder.title,
                      path: super.getFullPath(route.parent) + '/' + folder.id
                    });

    // Note: the resolve method can return any of the following types:
    //
    //   * IBreadcrumb[]
    //   * Observable<IBreadcrumb[]>
    //   * Promise<IBreadcrumb>

    return myCrumbs; 
  }
}
```

#### McBreadcrumbsConfig
The configuration of the breadcrumbs module. 

##### Members

**postProcess**

Callback function with the following signature:

```javascript
function (crumbs: IBreadcrumb[]) : Promise<IBreadcrumb[]> | Observable<IBreadcrumb[]> | IBreadcrumb[];
```

Can be used to make custom changes to the breadcrumb array after the service
has constructed the breadcrumb trail.

Example:
```javascript
@NgModule({
  /* ... */
})
export class AppModule {
  constructor(breadcrumbsConfig: McBreadcrumbsConfig) {

    breadcrumbsConfig.postProcess = (x) => {

      // Ensure that the first breadcrumb always points to home

      let y = x;

      if(x.length && x[0].text !== 'Home') {
        y = [
          {
            text: 'Home',
            path: ''
          }
        ].concat(x);
      }

      return y;
    };
  }
}
```
