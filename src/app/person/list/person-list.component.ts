import { Observable } from 'rxjs';
import { PersonService } from '../person.service';
import { Component, OnInit } from '@angular/core';
import { IPerson } from '../person.model';

@Component({
  templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit {

  persons: Observable<IPerson[]>;

  constructor(private service: PersonService) {}

  public ngOnInit(): void {
    this.persons = this.service.getAll();
  }
}
