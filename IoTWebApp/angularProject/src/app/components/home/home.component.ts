import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectableObservable } from 'rxjs';
import { SensorService } from 'src/app/Services/sensor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Hsensor?: any;
  Lsensor?: any;
  Msensor?: any;
  Tsensor?: any;

  constructor(private http:HttpClient, private sensorService: SensorService) {}


  ngOnInit(): void {
    this.retrieveHumidityData();    
    this.retrieveLightData();   
    this.retrieveMoistureData();   
    this.retrieveTemperatureData();  
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

  retrieveHumidityData(): void {
    this.sensorService.getAllHumidity()
      .subscribe({
        next: (datah) => {
          this.Hsensor = datah;
          console.log(datah);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveLightData(): void {
    this.sensorService.getAllLight()
      .subscribe({
        next: (datal) => {
          this.Lsensor = datal;
          console.log(datal);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveMoistureData(): void {
    this.sensorService.getAllMoisture()
      .subscribe({
        next: (datam) => {
          this.Msensor = datam;
          console.log(datam);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveTemperatureData(): void {
    this.sensorService.getAllTemperature()
      .subscribe({
        next: (datat) => {
          this.Tsensor = datat;
          console.log(datat);
        },
        error: (e) => console.error(e)
      });
  }


}
