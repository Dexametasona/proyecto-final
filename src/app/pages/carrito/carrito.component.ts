import { Component, OnInit } from '@angular/core';
import { ICarProd } from 'src/app/interfaces/iCarProd';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  listProd:ICarProd[]=[]
  page_size=5;
  page_number=1;
  page_size_list=[5,10,20]

  paginar(e:string){
    let page=Math.ceil(this.listProd.length/this.page_size);
    if(e=='+'){
      if (page>this.page_number) this.page_number+=1
    }
    else if(e=='-'){
      if (this.page_number>0) this.page_number-=1
    }
    else if(this.page_size_list.includes(Number(e))){
      this.page_size=Number(e)
      this.page_number=1
    }
  }
  constructor(private dbcarro:CarService) { }

  borrar(prod:ICarProd){
    this.dbcarro.deleteProd(prod)
  }
  ngOnInit(): void {  
    this.dbcarro.getProd().subscribe(res=>{
      this.listProd=res
    })
  }

}
