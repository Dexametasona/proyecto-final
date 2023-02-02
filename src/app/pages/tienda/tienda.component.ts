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
  constructor(private db:DataProdService, private route:Router) { }

  ngOnInit(): void {
    this.db.getProd().subscribe(res=>{
      this.listaProd=res
    })
  }
  mostrar(id:string){
    this.route.navigate(['/detail', id])
  }


}
