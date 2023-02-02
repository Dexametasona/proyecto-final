import { Iproduct } from './../../interfaces/iprod';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarService } from 'src/app/service/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() oculto!:boolean;
  @Output() emitirEstado=new EventEmitter<boolean>();
  @Input() producto!:Iproduct;

  form=new FormGroup({
    unit: new FormControl(0, [Validators.required, Validators.min(1)])
  })
  constructor(private carDB:CarService, private route:Router) { }
  cerrar(){
    this.emitirEstado.emit(!this.oculto)
  }
  comprar(){
    let producto={
      name:this.producto.name,
      costo:this.producto.costo*(1-this.producto.oferta!) || this.producto.costo,
      unid:this.form.get('unit')?.value || 0,
    }
    this.carDB.addProd(producto).then(x=>this.emitirEstado.emit(!this.oculto)).catch(err=>console.log(err))
    this.route.navigate(['/car'])
  }
  ngOnInit(): void {
  }
}
