import { IPerson } from '../person.model';
import { PersonService } from '../person.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  templateUrl: './person-edit.component.html',
})
export class PersonEditComponent implements OnInit, OnDestroy {
  subscriptions = new Array<any>();
  person: IPerson = { id: null, name: null };

  constructor(
    private route: ActivatedRoute,
    private service: PersonService,
    private router: Router) {}

  ngOnInit(): void {

    // const s = this.route.params.subscribe((x) => {
    //   const id = x.id;

    //   if(id) {
    //     this.service.get(id).then((x) => {
    //       this.person = x;
    //     });
    //   } else {
    //     this.person = {
    //       id: null,
    //       name: null
    //     };
    //   }
    // });

    const s = this.route.data.subscribe((x) => {
      this.person = x.person;
      // console.log(x);
    });

    this.subscriptions.push(s);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  onSubmit() {
    this.service.save(this.person).then((person: IPerson) => {
      this.router.navigate(['person']);
    });
  }
}

