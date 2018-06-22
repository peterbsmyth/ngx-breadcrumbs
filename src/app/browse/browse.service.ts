import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { utils } from '../shared/utils';
import { map, expand, takeWhile, toArray } from 'rxjs/operators';

@Injectable()
export class BrowseService {
  private folders = new BehaviorSubject<IFolder[]>([]);

  constructor() {
    this.folders.next(folders);
  }

  get(id: string): Observable<IFolder> {
    return this.folders.pipe(map(x => x.find(y => y.id === id)));
  }

  getChilds(parentId: string): Observable<IFolder[]> {
    return this.folders.pipe(
      map(x => {
        return x.filter(y => y.parentId === parentId);
      })
    );
  }

  getPath(leafId: string): Observable<IFolder[]> {
    return this.get(leafId).pipe(
      expand(x => this.get(x.parentId)),
      takeWhile(x => !!x),
      toArray(),
      map(x => x.reverse())
    );
  }
}

export interface IFolder {
  id: string;
  parentId: string;
  name: string;
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
