import { PersonResolver } from './person.resolver';
import { IPerson } from './person.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { PersonService } from './person.service';
import { PersonEditComponent } from './edit/person-edit.component';
import { PersonListComponent } from './list/person-list.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { routes } from "./person.routes";

@NgModule({
  declarations: [
    PersonListComponent,
    PersonEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PersonService,
    PersonResolver
  ]
})
export class PersonModule {
}
