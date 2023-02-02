import { CAROUSEL_DATA_ITEMS } from './../../const/carousel.const';
import { Icarousel } from './../../interfaces/icarousel';
import { DataService } from './../../service/data.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }
  public carouselData:Icarousel[]=CAROUSEL_DATA_ITEMS;
  ngOnInit(): void {
  }

}
