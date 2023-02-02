import { Subscription } from 'rxjs';
import { DataService } from './service/data.service';
import { AuthService } from './service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'proyecto-final';
  Subscript!:Subscription;
  listUser:User[]=[]
  status!:boolean;
  name!:string;
  type!:string;

  constructor(private auth:AuthService, private route:Router, private db:DataService) {}
  /* boton logout------------------------------------------ */
  logout(){
    /* verifica si hay usuario logeado */
    const auth=getAuth()
    const user=auth.currentUser;
    if(user!=null){
      Swal.fire({
        icon:'question',
        title:'Seguro que desea salir sesión?',
        showCancelButton:true,
        showConfirmButton:true
      }).then(async (res)=>{
        if(res.isConfirmed){
          /* funcion para logout */
          await this.auth.logout().then(()=>console.log('sesión cerrada')).catch(err=>console.log('ocurrio un error: '+err))
          let status={
            status:false,
            email:'',
            type:'',
            name:''
          }
          this.db.updateEstado$(status)
          this.route.navigate(['/login'])
        }
      })
    }else{
      Swal.fire({
        icon:'info',
        text:'Usuario no logeado'
      })
    }
    
  }
  ngOnInit(): void {
    /* verificador de usuario previamente logeado----------------------- */
    this.db.getUser().subscribe(res=>{
      this.listUser=res
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Usuario previo en linea')
          for(let i of this.listUser){
            if(i.email==user.email){
              if(i.email=='master@gmail.com'){
                var tipo='master';
              }else tipo='user';
              
              let status={
                status:true,
                email:i.email,
                type:tipo,
                name:i.name
              }
              this.db.updateEstado$(status)
              console.log('usario previo se actualiza al obs')
              break
            }
          }
        } else {
          console.log('no hay usuario previo por el momento')
          let status={
            status:false,
            email:'',
            type:'',
            name:''
          }
          this.db.updateEstado$(status)
        }
    })
    
    });
    /* actualizar la informacion de estados del servicio */
    this.Subscript=this.db.getEstado$().subscribe(res=>{
      this.status=res.status
      this.name=res.name
      this.type=res.type
    })
    
  }
  ngOnDestroy(): void {
    this.Subscript.unsubscribe()
  }
}
