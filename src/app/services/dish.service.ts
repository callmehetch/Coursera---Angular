import {Injectable} from '@angular/core';
import {Dish} from '../shared/dish';
// import {DISHES} from '../shared/dishes';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DishService {

  constructor( private http: Http,
               private processHTTPMsgService: ProcessHTTPMsgService) {
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
      .map(res => {
        return this.processHTTPMsgService.extractData(res);
      });
    // return Observable.of(DISHES).delay(2000);
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 sec delay
    //   setTimeout(() => resolve(DISHES), 2000);
    // });
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => {
        return this.processHTTPMsgService.extractData(res);
      });
    // return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => {
        return this.processHTTPMsgService.extractData(res)[0];
      });
    // return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => {
        return dishes.map(dish => dish.id );
      });
    // return Observable.of(DISHES.map(dish => dish.id));
  }


}
