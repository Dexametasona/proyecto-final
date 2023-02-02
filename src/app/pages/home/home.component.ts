import { Iproduct } from './../../interfaces/iprod';
import { DataProdService } from 'src/app/service/data-prod.service';
import { CAROUSEL_DATA_ITEMS } from './../../const/carousel.const';
import { Icarousel } from './../../interfaces/icarousel';
import { DataService } from './../../service/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listDestacado:Iproduct[]=[]
  constructor(private db:DataProdService, private route:Router) { }
  public carouselData:Icarousel[]=CAROUSEL_DATA_ITEMS;

  mostrar(id:string){
    this.route.navigate(['/detail', id])
  }
  
  ngOnInit(): void {
    this.db.getProd().subscribe(res=>{
      let recordar=-1
      while(this.listDestacado.length<4){
        let random=Math.floor(Math.random()*10)
        if(random!=recordar){
          this.listDestacado.push(res[random])
          recordar=random
        }
      }
    })
  }

}
