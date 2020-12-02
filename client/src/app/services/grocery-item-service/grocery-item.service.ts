import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import Grocery from '@models/grocery';
import { environment } from '@config';

@Injectable({
  providedIn: 'root'
})
export class GroceryItemService {
  public baseApiUrl = environment.serverUrl;
  public groceriesChanged = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Array<Grocery>> {
    return this.httpClient.get<Array<Grocery>>(`${this.baseApiUrl}/groceries`);
  }

  public get(grocery: Grocery): Observable<Grocery> {
    return this.httpClient.get<Grocery>(`${this.baseApiUrl}/groceries/${grocery._id}`);
  }

  public async create(grocery: Grocery) {
    return this.httpClient.post<Grocery>(`${this.baseApiUrl}/groceries`, grocery).toPromise()
      .then(addedGrocery => {
        this.groceriesChanged.next(true);

        return addedGrocery;
      });
  }

  public async update(grocery: Grocery) {
    return this.httpClient.put<Grocery>(`${this.baseApiUrl}/groceries/${grocery._id}`, grocery).toPromise()
      .then(updatedGrocery => {
        this.groceriesChanged.next(true);

        return updatedGrocery;
      });
  }

  public async delete(grocery: Grocery) {
    return this.httpClient.delete<{}>(`${this.baseApiUrl}/groceries/${grocery._id}`).toPromise()
      .then(deletedGrocery => {
        this.groceriesChanged.next(true);

        return deletedGrocery;
      });
  }
}
