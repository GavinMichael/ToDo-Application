import { DataWorkerService } from './../service/data-worker.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'completed-todo',
  templateUrl: './completed-todo.component.html',
  styleUrls: ['./completed-todo.component.css']
})
export class CompletedTodoComponent implements OnInit {

  completedTodosArray = [];
  constructor(
    private service: DataWorkerService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.service.fetchAllTodos()
      .subscribe(Response => {
        let allTodosArray = Response.json();
        for (let todo of allTodosArray) {
          // get all active todos only
          if (todo.status === 'Completed') {
            this.completedTodosArray.push(todo);
          } // end of if
        } // of for
        this.completedTodosArray.reverse();
      }),
      Error => {
        console.log(Error);
        this.toastr.error('Error loading todos');
      }
  }
  
  activateTodo(todo) {
    todo.status = 'Active';
    let index = this.completedTodosArray.indexOf(todo);
    this.completedTodosArray.splice(index, 1);
    this.service.updateTodo(todo)
      .subscribe(Response => {
        this.toastr.success('Marked as Active');
      }),
      Error => {
        console.log(Error);
        this.toastr.error('Failed to mark as Active');
      }
  }

  // Deleting a todo
  deleteTodo(todo) {
    // get index of the todo being deleted
    let index = this.completedTodosArray.indexOf(todo);
    // remove that from the view
    this.completedTodosArray.splice(index, 1);
    // Delete http request sent to service
    let id = todo._id;
    this.service.deleteTodo(id)
      .subscribe(Response => {
        this.toastr.success('Deleted successfully');     
      }),
      Error => {
        console.log(Error);  
        this.toastr.error('Error! Failed to delete');      
      }
  }

}
