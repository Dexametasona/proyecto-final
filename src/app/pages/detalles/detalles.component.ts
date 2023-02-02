import { Iproduct } from './../../interfaces/iprod';
import { DataProdService } from 'src/app/service/data-prod.service';
import { ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  id!:string|null;
  producto:Iproduct={
    name:'',
    imagen:'',
    descript:'',
    costo:0
  }
  oculto=false;
  constructor(private _location:Location, private router:ActivatedRoute, private dbprod:DataProdService) { }

  ngOnInit(): void {
    this.id=this.router.snapshot.paramMap.get('id')
    this.dbprod.getProdOnly(this.id || '').subscribe(res=>{
      this.producto=res;
    })
  }
  back(){
    this._location.back()
  }
  recibirEstado(estado:boolean){
    this.oculto=estado;
  }
  modal(){
    console.log('olluco')
    this.oculto=true;
  }

}
