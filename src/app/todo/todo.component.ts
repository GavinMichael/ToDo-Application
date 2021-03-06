import { DataWorkerService } from './../service/data-worker.service';
import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  // main array holding all the todos
  todosArray = [];
  // holds all the todos from the server
  allTodosArray = [];
  // hold only the active todos
  activeTodosArray = [];
  // holds all the completed toods
  completedTodosArray = [];
  // used to show and hide the add todo form
  todoFormHidden: boolean = true;

  editedTodo = {
    title: null,
    desc: null,
    label: null,
    completedOn: null,
    status: null,
    addedOn: null,
    priority: null
  };

  constructor(
    private service: DataWorkerService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // get all the todos from the server
    this.service.fetchAllTodos()
      .subscribe(Response => {
        this.allTodosArray = Response.json();
        this.allTodosArray.reverse();
        // call the function which will handle the sorting
        this.filterActiveTodos(this.allTodosArray);
      },
      Error => {
        console.log(Error);        
        // Add error message to page
        let errorObj = {
          title: 'Unable to load Todos',
          desc: Error
        }
        this.activeTodosArray.push(errorObj);
      }
    )

    // Adding a new todo from new-todo.component
    this.service.newTodoObj
      .subscribe(Response => {
        let newTodoFromNewTodoComponent = Response;
        // Insert the new todo into the view
        this.activeTodosArray.splice(0, 0, newTodoFromNewTodoComponent);        
      })
  } 

  // called on init to filter all the active 
  // todos that will be rendered to the view
  filterActiveTodos(allTodos) {
    for (let todo of allTodos) {
      // get all active todos only
      if (todo.status === 'Active') {
        this.activeTodosArray.push(todo);
      } else if (todo.status === 'Completed') {
        this.completedTodosArray.push(todo);        
      }
    }
  }

  completeTodo(todo) {
    // get index of the todo being completed
    let index = this.activeTodosArray.indexOf(todo);
    // remove it from the view
    this.activeTodosArray.splice(index, 1);
    // change the status field to Completed
    todo.status = 'Completed';
    todo.completedOn = Date();
    // push it to the completed todos array
    this.completedTodosArray.push(todo);
    // Update DB record
    this.service.updateTodo(todo)
      .subscribe(Response => {
        // Toast  
        this.toastr.success('Marked as Completed');
      }),
      Error => {
        console.log(Error);
        this.toastr.error('Error! Failed to mark as Completed');
      }
      
  }

  // Deleting a todo
  deleteTodo(todo) {
    // get index of the todo being deleted
    let index = this.activeTodosArray.indexOf(todo);
    // remove that from the view
    this.activeTodosArray.splice(index, 1);
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

  
  toggleTodoFrom() {
    this.todoFormHidden = !this.todoFormHidden;
  }

  editTodo(todo) {
    this.editedTodo = todo;
  }

  // Edit todo form submit
  editTodoFormSubmit(f) {
    
    let updatedTodo = this.editedTodo;
    updatedTodo['title'] = f.value.title;
    updatedTodo['desc'] = f.value.desc;
    updatedTodo['priority'] = f.value.priority;
    updatedTodo['label'] = f.value.label;
    
    // find the index of the todo that is being edited
    let index = this.activeTodosArray.indexOf(this.editedTodo)
    this.activeTodosArray[index].title = updatedTodo['title'];
    this.activeTodosArray[index].desc = updatedTodo['desc'];

    this.service.updateTodo(this.activeTodosArray[index])
      .subscribe(Response => {
        this.toastr.success('Updated successfully');
        f.reset();   
      }),
      Error => {
        console.log(Error);  
        this.toastr.error('Error! Failed to delete');  
      }
  }

}
