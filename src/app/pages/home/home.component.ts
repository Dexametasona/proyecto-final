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
/* boton detalles-------------------------------------------------- */
  mostrar(id:string){
    this.route.navigate(['/detail', id])
  }
  
  ngOnInit(): void {
    /* consumimos la base de datos y generamos un producto aleatorio */
    this.db.getProd().subscribe(res=>{
      let recordar=[-1]
      while(this.listDestacado.length<4){
        let random=Math.floor(Math.random()*res.length)
        let verificar=false
        for(let i of recordar){
          if(random==i){
            verificar=false
            break
          }else{
            verificar=true
          }
        }
        if(verificar){
          this.listDestacado.push(res[random])
          recordar.push(random)
        }
      }
    })
  }

}
