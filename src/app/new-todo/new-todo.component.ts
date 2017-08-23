import { DataWorkerService } from './../service/data-worker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  newTodo = {};

  constructor(private service: DataWorkerService) { }

  ngOnInit() {
  }

  submit(form) {

    // reset the newTodo Obj
    this.newTodo = {
      title: "",
      desc: "",
      label: "#b5b5b5",
      status: "Active",
      addedOn: Date(),
      priority: "Normal"
    };

    // Set new form values
    this.newTodo['title'] = form.value.title;
    this.newTodo['desc'] = form.value.desc;
    // Label default logic
    if (form.value.label) {
      this.newTodo['label'] = form.value.label;
    } else {
      this.newTodo['label'] = '#b5b5b5';
    }
    // Label default logic
    if (form.value.priority) { 
      this.newTodo['priority'] = form.value.priority;
    } else {
      this.newTodo['priority'] = 'Normal';
    }

    // Call the service to handle new todo
    this.service.addNewTodo(this.newTodo);
    
    // Reset form fields
    form.reset();

  } // end of submit()

}
