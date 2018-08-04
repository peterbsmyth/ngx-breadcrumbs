import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { IPerson } from './person.model';
import { Injectable } from '@angular/core';
import { utils } from '../shared/utils';

@Injectable()
export class PersonService {
  constructor() { }

  private persons = new BehaviorSubject<IPerson[]>(persons);

  getAll(): Observable<IPerson[]> {
    return this.persons;
  }

  get(id: string): Promise<IPerson> {
    return this.persons.pipe(
      map(x => x.find(y => y.id === id)),
      first()
    ).toPromise();
  }

  save(person: IPerson): Promise<IPerson> {

    return new Promise((resolve) => {
      const persons = [... this.persons.getValue()];

      if (!person.id) {
        person.id = utils.guid();
        persons.push(person);
      } else {
        const idx = persons.findIndex((x) => x.id === person.id);
        persons.splice(idx, 1, person);
      }

      this.persons.next(persons);

      resolve(person);
    });
  }
}

const persons = new Array<IPerson>();

for (let i = 0; i < 20; i++) {
  persons.push({
    id: utils.guid(),
    name: utils.randomWords(utils.randomInt(2, 4), true)
  });
}
