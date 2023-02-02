import { DataProdService } from 'src/app/service/data-prod.service';
import { Iproduct } from './../../interfaces/iprod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  listProd:Iproduct[]=[]
  page_size=10;
  page_number=1;
  page_size_list=[10,25,50,100]

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

  constructor(private dbprod:DataProdService) { }

  borrar(prod:Iproduct){
    this.dbprod.deleteProd(prod)
  }
  ngOnInit(): void {
    this.dbprod.getProd().subscribe(res=>{
      this.listProd=res
    })
  }

}
