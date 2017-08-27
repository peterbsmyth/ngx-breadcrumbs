import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { utils } from "../shared/utils";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/takeWhile';

@Injectable()
export class BrowseService {

  private folders = new BehaviorSubject<IFolder[]>([]);

  constructor() {
    this.folders.next(folders);
  }

  get(id: string): Observable<IFolder> {
    return this.folders.map(x => x.find(y => y.id === id));
  }

  getChilds(parentId: string): Observable<IFolder[]> {
    return this.folders.map((x) => {
      return x.filter((y) => y.parentId === parentId);
    });
  }

  getPath(leafId: string): Observable<IFolder[]> {
    return this.get(leafId)
      .expand(x => this.get(x.parentId))
      .takeWhile(x => !!x)
      .toArray()
      .map(x => x.reverse());
  }
}

export interface IFolder {
  id: string,
  parentId: string,
  name: string
}

const folders: Array<IFolder> = [];

const minChilds = 1;
const maxChilds = 10;
const levels = 3;

function createFolders(parentId: string, level: number) {
  let count = utils.randomInt(minChilds, maxChilds);
  while (count--) {
    let id = utils.guid();
    folders.push({
      id: id,
      parentId: parentId,
      name: utils.randomWords(utils.randomInt(2, 5), true)
    });

    if (level) {
      createFolders(id, level - 1);
    }
  }
}

createFolders(null, levels);

