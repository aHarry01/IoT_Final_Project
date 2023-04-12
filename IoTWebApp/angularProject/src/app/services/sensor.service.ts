// File:           sensor.service.ts
// Description:    This is the service file that uses Angular HttpClient to send HTTP requests for the sensor data.
//                 The functions includes CRUD operations and a finder method.
// Last Modified:  November 2nd, 2022

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl1 = 'http://localhost:3000/humiditysensor';
const baseUrl2 = 'http://localhost:3000/lightsensor';
const baseUrl3 = 'http://localhost:3000/moisturesensor';
const baseUrl4 = 'http://localhost:3000/temperaturesensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  // Gets all the Humidity Sensor Data
  getAllHumidity(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl1);
  }

  // Get Humidity Sensor Data by ID
  getHumidityByID(id: any): Observable<any> {
    return this.http.get(`${baseUrl1}/${id}`);
  }

  // Gets all the Light Exposure Sensor Data
  getAllLight(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl2);
  }

  // Get Light Exposure Sensor Data by ID
  getLightByID(id: any): Observable<any> {
    return this.http.get(`${baseUrl2}/${id}`);
  }

  // Gets all the Moisture Sensor Data
  getAllMoisture(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl3);
  }

  // Get Moisture Sensor Data by ID
  getMoistureByID(id: any): Observable<any> {
    return this.http.get(`${baseUrl3}/${id}`);
  }

  // Gets all the Temperature Sensor Data
  getAllTemperature(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl4);
  }

  // Get Temperature Sensor Data by ID
  getTemperatureByID(id: any): Observable<any> {
    return this.http.get(`${baseUrl4}/${id}`);
  }

}
