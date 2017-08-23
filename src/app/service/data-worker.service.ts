import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject'


@Injectable()
export class DataWorkerService {

  public newTodoObj = new Subject<any>();
  private _apiURL = "http://localhost:3000/api/todos";

  constructor(private http: Http) { }

  // Used by todo.component on init to render all todos from server
  fetchAllTodos() {
    return this.http.get(this._apiURL);
  }

  // Used by new-todo.component to add a new todo
  // communicates with the todo.component and server
  addNewTodo(newTodo) {
    
    // Post to server
    this.http.post(this._apiURL, newTodo)
      .subscribe(Response => {
        // addint response _id from server
        let _id = Response.json()._id;
        newTodo['_id'] = _id;
        // Add to view
        this.newTodoObj.next(newTodo);        
      }),
      Error => {
        console.log(Error);
        alert('Failed to add todo');
      }
  }
}
