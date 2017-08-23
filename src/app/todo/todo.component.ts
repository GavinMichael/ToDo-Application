import { DataWorkerService } from './../service/data-worker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  // main array holding all the todos
  todosArray = [];

  constructor(private service: DataWorkerService) { }

  ngOnInit() {
    // get all the todos from the server
    this.service.fetchAllTodos()
      .subscribe(Response => {
        this.todosArray = Response.json();
      },
      Error => {
        console.log(Error);        
        // Add error message to page
        let errorObj = {
          title: 'Unable to load Todos',
          desc: Error
        }
        this.todosArray.push(errorObj);
      }
    )

    this.service.newTodoObj
      .subscribe(Response => {
        let newTodoFromNewTodoComponent = Response;
        // Insert the new todo into the view
        this.todosArray.splice(0, 0, newTodoFromNewTodoComponent);
        console.log(this.todosArray);        
      })
  } 

}