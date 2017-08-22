import { Component, OnInit } from '@angular/core';
import { DataWorkerService } from "../service/data-worker.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: DataWorkerService) { }

  ngOnInit() {
  }

}
