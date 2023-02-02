import { Iproduct } from './../../interfaces/iprod';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataProdService } from 'src/app/service/data-prod.service';

@Component({
  selector: 'app-reg-prod',
  templateUrl: './reg-prod.component.html',
  styleUrls: ['./reg-prod.component.scss']
})
export class RegProdComponent implements OnInit {
  alert!:boolean;
  mensaje!:string;
  /* formulario de registro de nuevos productos------------------------------------------------------- */
  form=new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    descript: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]),
    costo: new FormControl(0, [Validators.required, Validators.min(0)]),
    oferta: new FormControl(null, [Validators.min(0),Validators.max(0.7)]),
    imagen: new FormControl('', [Validators.required]),
  })
  /* registrar nuevos productos----------------------------------- */
  regist(){
    this.datos.addProd(this.form.value as Iproduct)
    this.form.reset()
    this.mensaje='producto registrado exitosamente'
    this.alert=true;
    setTimeout(() => {
      this.alert=false;
    }, 4000);
    
  }
  constructor(private datos:DataProdService) { }

  ngOnInit(): void {
  }

}
