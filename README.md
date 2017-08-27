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

Import the `McBreadcrumbsModule` in your root module (`app.module.ts`) after importing the _router_ module. 

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

Place the `mc-breadcrumbs` component, which will render the breadcrumbs, somewhere in your markup.

```javascript
@Component({
  selector: 'app-root',
  template: `<div class="container">
       			<mc-breadcrumbs></mc-breadcrumbs>
       			<router-outlet></router-outlet>
     		</div>`
})
export class AppComponent {}
```

Usage of the `mc-breadcrumbs` render component is optional. If a different markup output is desired, a custom component can be created that subscribes to the `McBreadcrumbsService.crumbs$` observable.  

### Routing Configuration

Breadcrumbs links are generated based on the route configuration. If a route entry contains a `data.breadcrumbs` property the _breadcrumbs service_ assumes breadcrumbs should be created whenever this route or one its child routes are active. 

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

 

