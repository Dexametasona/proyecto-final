import { Subscription } from 'rxjs';
import { DataService } from './service/data.service';
import { AuthService } from './service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'proyecto-final';
  Subscript!:Subscription;
  status!:boolean;
  name!:string;
  type!:string;

  constructor(private auth:AuthService, private route:Router, private db:DataService) {}
  logout(){
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
          await this.auth.logout().then(()=>console.log('sesión cerrada')).catch(err=>console.log('ocurrio un error: '+err))
          let status={
            status:false,
            email:'',
            type:'',
            name:''
          }
          this.db.updateEstado$(status)
          // await this.db.updateStatus(status).then(res=>console.log('logout')).catch(err=>console.log(err))
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
    this.Subscript=this.db.getEstado$().subscribe(res=>{
      this.status=res.status
      this.name=res.name
      this.type=res.type
    })
    this.auth.logout().then(()=>console.log('sesión cerrada al inicio')).catch(err=>console.log('ocurrio un error: '+err))
  }
  ngOnDestroy(): void {
    this.Subscript.unsubscribe()
  }
}
