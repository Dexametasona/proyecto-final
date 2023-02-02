import { AdminGuard } from './guards/admin.guard';
import { LoginChildComponent } from './pages/login-child/login-child.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistComponent } from './pages/regist/regist.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginGuard } from './guards/login.guard';
import { ProductComponent } from './pages/product/product.component';
import { RegProdComponent } from './pages/reg-prod/reg-prod.component';
import { DetallesComponent } from './pages/detalles/detalles.component';


const routes: Routes = [
  {path:'home', component:HomeComponent,  ...canActivate(()=>redirectUnauthorizedTo(['/login/loginChild']))},
  {path:'detail/:id', component:DetallesComponent,  ...canActivate(()=>redirectUnauthorizedTo(['/login/loginChild']))},
  {path:'prod', component:ProductComponent, canActivate:[AdminGuard]},
  {path:'regProd', component:RegProdComponent,canActivate:[AdminGuard]},
  {path:'login', component:LoginComponent, canActivate:[LoginGuard], children:[
    {path:'loginChild', component:LoginChildComponent},
    {path:'regist', component:RegistComponent},
    {path:'', redirectTo:'loginChild', pathMatch:'full'}
  ]},
  {path:'tienda', component:TiendaComponent, ...canActivate(()=>redirectUnauthorizedTo(['/login/loginChild']))},
  {path:'car', component:CarritoComponent, ...canActivate(()=>redirectUnauthorizedTo(['/login/loginChild']))},
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

