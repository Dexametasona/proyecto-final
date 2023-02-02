import { Iproduct } from './../../interfaces/iprod';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() oculto!:boolean
  @Output() emitirEstado=new EventEmitter<boolean>();
  @Input() producto!:Iproduct;

  form=new FormGroup({
    unit: new FormControl(0, [Validators.required, Validators.min(0)])
  })
  constructor() { }
  cerrar(){
    this.emitirEstado.emit(!this.oculto)
  }
  comprar(){

  }
  ngOnInit(): void {
  }
}
