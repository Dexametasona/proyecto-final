import { PaginacionPipe } from './../pipes/paginacion.pipe';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CarritoComponent } from './carrito/carrito.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistComponent } from './regist/regist.component';
import { LoginChildComponent } from './login-child/login-child.component';
import { ProductComponent } from './product/product.component';
import { RegProdComponent } from './reg-prod/reg-prod.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DetallesComponent } from './detalles/detalles.component';



@NgModule({
  declarations: [
    HomeComponent,
    TiendaComponent,
    CarritoComponent,
    LoginComponent,
    RegistComponent,
    LoginChildComponent,
    ProductComponent,
    RegProdComponent,
    CarouselComponent,
    PaginacionPipe,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    HomeComponent,
    TiendaComponent,
    CarritoComponent,
    LoginComponent,
    RegistComponent,
    LoginChildComponent,
    ProductComponent,
    RegProdComponent,
    CarouselComponent
  ],
})
export class PagesModule { }
