import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submit(form) {
    console.log(form.value);    
  }
}
