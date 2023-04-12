import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Lights: boolean = false;
  TempVal: number = 0.0;
  HumidityVal: number = 0.0;
  LightVal: number = 0.0;
  MoistureVal: number = 0.0;

  constructor(private http:HttpClient) {}


  ngOnInit(): void {

  }

  async WaterValve(){

  }


  // Websites: https://www.npmjs.com/package/ng-image-slider
  name = 'Angular';
  imageObject = [{
      image: '../../../assets/Images/Slideshow1Image.png',
      thumbImage: '../../../assets/Images/Slideshow1Image.png',
      title: 'Testing of the Greenhouse Prototype',
      order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  }, {
      image: '../../../assets/Images/Slideshow2Image.png',
      thumbImage: '../../../assets/Images/Slideshow2Image.png',
      title: 'Testing of the Greenhouse Prototype',
      order: 2 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  },{
      image: '../../../assets/Images/Slideshow3Image.png',
      thumbImage: '../../../assets/Images/Slideshow3Image.png',
      title: 'SimpleLink with LED Strip',
      order: 3 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  }];


}
