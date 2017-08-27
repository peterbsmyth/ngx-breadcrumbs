import { PersonService } from './person.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { IPerson } from "./person.model";

@Injectable()
export class PersonResolver implements Resolve<IPerson> {

  constructor(private service: PersonService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IPerson> {

    const id = route.params.id;

    if (id) {
      return this.service.get(id);
    } else {
      return Promise.resolve({
        id: null,
        name: null
      });
    }
  }
}
