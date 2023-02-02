import { Iproduct } from './../../interfaces/iprod';
import { DataProdService } from 'src/app/service/data-prod.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  listaProd:Iproduct[]=[]
  oculto=false;
  producto!:Iproduct;
  constructor(private db:DataProdService, private route:Router) { }
  page_size=5;
  page_number=1;
  page_size_list=[5,10,20]

  paginar(e:string){
    let page=Math.ceil(this.listaProd.length/this.page_size);
    if(e=='+'){
      if (page>this.page_number) this.page_number+=1
    }
    else if(e=='-'){
      if (this.page_number>1) this.page_number-=1
    }
    else if(this.page_size_list.includes(Number(e))){
      this.page_size=Number(e)
      this.page_number=1
    }
  }

  ngOnInit(): void {
    this.db.getProd().subscribe(res=>{
      this.listaProd=res
    })
  }
  mostrar(id:string){
    this.route.navigate(['/detail', id])
  }
  modal(prod:Iproduct){
    this.oculto=true,
    this.producto=prod
  }
  recibirEstado(estado:boolean){
    this.oculto=estado;
  }


}
