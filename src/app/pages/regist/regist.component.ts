import { AuthService } from './../../service/auth.service';
import { DataService } from './../../service/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit, OnDestroy {
  constructor(private db:DataService, private route:Router, private auth:AuthService) { }

/* formulario ---------------------------------------------------------- */
  form= new FormGroup({
    name: new FormControl('',[
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(15), 
      Validators.pattern('^[a-zA-ZÀ-ÿ]+$')]),
    email:new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('^[a-zA-ZÀ-ÿ0-9.\\-_]+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')
    ]),
    pass: new FormControl('',[
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(10)])
  });

  alert=false; /*estado de alerta----------------------- */
  mensaje!:string;
  ListaUser:User[]=[]

  
  async regist(){
    /* verificador--------------------------- */ 
    let status=false
    for(let i of this.ListaUser){
      if(i.email==this.form.get('email')?.value){
        status=true;
        break
      }else{
        status=false
      }
    }
    /* registrar nuevo usuario */
    if(status==false){
      /* agreaga a la base de datos---------------------------------------- */
      await this.db.addUser(this.form.value as User)  
        /* agrega a la bd auth e inicia sesion????-------------------------------------------------------- */
      await this.auth.registUser(this.form.value as {email:string, pass:string})
      .then(x=>console.log('usuario registrado en bd personal'))
      .catch(x=>console.log(x))
      this.mensaje='Nuevo usuario registrado.';
      this.form.reset()
      // await this.auth.logout()
      this.route.navigate(['/home'])
    }else this.mensaje='Correo ya existente, intentelo otra vez.';
    /* disparador de la alerta............................... */
    this.alert=true;
    setTimeout(() => {
      this.alert=false;
    }, 4000);
    
  }
  /* opcion cancelar */
  cancelar(){
    Swal.fire({
      icon:'question',
      title:'Seguro que desea salir?',
      showCancelButton:true,
      showConfirmButton:true
    }).then(res=>{
      if(res.isConfirmed) this.route.navigate(['/login'])
    })
  }
  /* consumo de base de datos------------------------------------------------- */
  suscript!:Subscription
  ngOnInit(): void {
    this.suscript= this.db.getUser().subscribe(res=>{
      this.ListaUser=res
    });
  }

  ngOnDestroy(): void {
    this.suscript.unsubscribe()
  }

}
