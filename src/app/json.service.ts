import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JsonService {
  
  //json from textarea
  private jsonDataSource = new Subject<string>();
  // array of objects from table
  private jsDataSource = new Subject<any[]>();

  jsonData$ = this.jsonDataSource.asObservable();  
  jsData$ = this.jsDataSource.asObservable();
  
  sendJson(data:string){
    this.jsonDataSource.next(data)
  }

  sendArray(arr:any[]){
    this.jsDataSource.next(arr)
  }

  
  
   constructor() { }
}
