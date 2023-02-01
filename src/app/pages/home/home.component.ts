import { DataService } from './../../service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db:DataService) { }

  ngOnInit(): void {
  }
  mostrar(){
    alert(this.db.estado.status)
    alert(this.db.estado.status)
  }
}
