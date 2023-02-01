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
          await this.db.updateStatus(status).then(res=>console.log('logout')).catch(err=>console.log(err))
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
  mostrar(){
    alert(this.status)
  }
  ngOnInit(): void {
    // this.Subscript=this.db.getstatus().subscribe(res=>{
    //   this.status=res[0].status
    //   this.name=res[0].name
    //   this.type=res[0].type
    // })
    // this.status=this.db.estado.status;
    // this.name=this.db.estado.name;
    // this.type!=this.db.estado.type;
    
  }
  ngOnDestroy(): void {
    // this.Subscript.unsubscribe()
  }
}
