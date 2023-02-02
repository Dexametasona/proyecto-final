import { Component, Input, OnInit } from '@angular/core';
import { Icarousel } from 'src/app/interfaces/icarousel';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() height=300;
  @Input() isFullScreen=false;
  @Input() items:Icarousel[]=[]

  public finalHeight:string|number=0
  public currentPosition=0
  constructor(private db:DataService) {
    this.finalHeight=this.isFullScreen? '100vh':`${this.height}px`
  }
  
  ngOnInit(): void {
    this.items.map((i, index)=>{
      i.id=index;
      i.marginLeft=0;
    })
  }
  
  setCurrentPosition(position:number){
    this.currentPosition=position;
    this.items.find(i=> i.id===0)!.marginLeft= -100*position;
  }
  
  setNext(){
    let finalpercentage=0;
    let nextPosition=this.currentPosition+1;
    if(nextPosition<=this.items.length-1){
      finalpercentage=-100*nextPosition;
    }else{
      nextPosition=0
    }
    this.items.find(i=>i.id===0)!.marginLeft=finalpercentage
    this.currentPosition=nextPosition
  }
  setBack(){
    let finalpercentage=0;
    let backPosition=this.currentPosition-1;
    if(backPosition>=0){
      finalpercentage=-100*backPosition
    }else{
      backPosition=this.items.length-1;
      finalpercentage=-100*backPosition
    }
    this.items.find(i=>i.id===0)!.marginLeft=finalpercentage
    this.currentPosition=backPosition
  }
 
}
