import { Subscription } from 'rxjs';
import { DataService } from './../../service/data.service';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import Swal from 'sweetalert2';
import {  Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login-child',
  templateUrl: './login-child.component.html',
  styleUrls: ['./login-child.component.scss']
})
export class LoginChildComponent implements OnInit, OnDestroy{
  constructor(private auth:AuthService, private route:Router, private db:DataService) { }
  form= new FormGroup({
    email: new FormControl('',[
      Validators.required, 
      Validators.minLength(10), 
      Validators.pattern('^[a-zA-ZÀ-ÿ0-9.-_]+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
    pass: new FormControl('',[
      Validators.required, 
      Validators.minLength(6)])
  });

  title='Iniciar Sesión';
  listUser:User[]=[];
  suscript!:Subscription;
  alert=false;

  mensaje!:string;
  login(){
    this.auth.signUser(this.form.value as {email:string, pass:string}).then(res=>{
      for(let i of this.listUser){
        if(i.email==this.form.get('email')?.value){
          if(i.email=='master@gmail.com'){
            var tipo='master';
          }else tipo='user';

          let status={
            status:true,
            email:i.email,
            type:tipo,
            name:i.name
          }
          this.db.updateStatus(status).then(res=>console.log('usuario actualizado')).catch(err=>console.log(err))
        }
      }
      Swal.fire({
        icon:'success',
        title:'Inicio de sesión exitoso',
        heightAuto:false
      })
      this.route.navigate(['/home'])
    }).catch((err:FirebaseError)=>{
      if (err.code==='auth/user-not-found') this.mensaje='Usuario no encontrado';
      else if(err.code==='auth/wrong-password') this.mensaje='Contraseña inválida'
      else console.log(err.code)

      this.alert=true;
      setTimeout(() => {
        this.alert=false;
      }, 2000);
    })

  }

  animacionIn(Label:string ){
    let label=document.getElementById(Label) as HTMLLabelElement
    label.classList.add('prueba')
    label.style.opacity='80%';
  }
  animacionOut(Label:string, Input:string){
    let label=document.getElementById(Label) as HTMLLabelElement
    let input=document.getElementById(Input) as HTMLInputElement
    if(input.value=='' || input.value==null){
      label.classList.toggle('prueba')
      label.style.opacity='50%';
    }
  }


  ngOnInit(): void {
    this.suscript=this.db.getUser().subscribe(res=>this.listUser=res)
  }
  ngOnDestroy(): void {
    this.suscript.unsubscribe
  }
}
