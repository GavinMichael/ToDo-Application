import { DataWorkerService } from './../service/data-worker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  constructor(private service: DataWorkerService) { }

  ngOnInit() {
  }

  submit(form) {
    console.log(form.value);
    // add to the active todolist array
    // post to the server
    
  }
}
