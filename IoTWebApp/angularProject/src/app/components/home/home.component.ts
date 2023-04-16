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
	//get plant status when page is loaded 
	// https://www.geeksforgeeks.org/how-to-make-ajax-call-from-javascript/
	let xhr = new XMLHttpRequest();
	var url = 'http://localhost:3000/plantStatus';
	xhr.open("GET", url, true);
	// function execute after request is successful 
	xhr.onreadystatechange = function () {
		(<HTMLParagraphElement>document.getElementById("plantStatus")).innerText = this.responseText;
	}
	xhr.send();
  }
  
  public waterPlant(event:any) {
	console.log("making request");
	// https://www.geeksforgeeks.org/how-to-make-ajax-call-from-javascript/
	let xhr = new XMLHttpRequest();
	var url = 'http://localhost:3000/waterPlant';
	xhr.open("GET", url, true);
	xhr.send();
  }
  
  public changeWateringMode(event:any){
  	var newMethod = (<HTMLInputElement>document.getElementById("waterMethod")).value;;
	console.log("making request - change watering method to " + newMethod);
	let xhr = new XMLHttpRequest();

	// Making our connection  
	var url = 'http://localhost:3000/waterMethodChange?method=' + newMethod;
	xhr.open("GET", url, true);
	xhr.send();
  }
  
  public updateAlertLevels(event:any){
	var tempLower = (<HTMLInputElement>document.getElementById("tempLower")).value;
	var tempUpper = (<HTMLInputElement>document.getElementById("tempUpper")).value;
	var tempRange = tempLower + "_" + tempUpper;

	var humidityLower = (<HTMLInputElement>document.getElementById("humidityLower")).value;
	var humidityUpper = (<HTMLInputElement>document.getElementById("humidityUpper")).value;
	var humidityRange = humidityLower + "_" + humidityUpper;
	
	var soilMoisture = (<HTMLInputElement>document.getElementById("soilMoisture")).value;
	var sunlightExposure = (<HTMLInputElement>document.getElementById("sunlightTime")).value;
	var wateringTime = (<HTMLInputElement>document.getElementById("wateringTime")).value;
	
	let xhr = new XMLHttpRequest();
	// Making our connection  
	var url = 'http://localhost:3000/alertLevels?tempRange=' + tempRange + 
				'&humidityRange=' + humidityRange + 
				'&soilMoisture=' + soilMoisture + 
				'&sunlightExposureTime=' + sunlightExposure + 
				'&wateringTime=' + wateringTime;
	console.log("Making request to: " + url);
	xhr.open("GET", url, true);
	// Sending our request 
	xhr.send();
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
