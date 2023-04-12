import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportToCsv } from 'export-to-csv';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-sensordata',
  templateUrl: './sensordata.component.html',
  styleUrls: ['./sensordata.component.css']
})
export class SensordataComponent implements OnInit {

  Hsensor?: any;
  Lsensor?: any;
  Msensor?: any;
  Tsensor?: any;
  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  displayTable: boolean = false;
  Alldatah: any = [{ SensorID: '',SensorName: '',DateCollected: '',TimeCollected: '',Data: '',}];
  Alldatal: any = [{ SensorID: '',SensorName: '',DateCollected: '',TimeCollected: '',Data: '',}];
  Alldatam: any = [{ SensorID: '',SensorName: '',DateCollected: '',TimeCollected: '',Data: '',}];
  Alldatat: any = [{ SensorID: '',SensorName: '',DateCollected: '',TimeCollected: '',Data: '',}];
 
  constructor(private http:HttpClient, private sensorService: SensorService) {}

 
  ngOnInit(): void {
    this.retrieveHumidityData();    
    this.retrieveLightData();   
    this.retrieveMoistureData();   
    this.retrieveTemperatureData();    
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      search: {
        return: true,
      }
    };
  }

  retrieveHumidityData(): void {
    this.sensorService.getAllHumidity()
      .subscribe({
        next: (datah) => {
          this.Hsensor = datah;
	        this.Alldatah = datah;
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
	        this.Alldatal = datal;
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
	        this.Alldatam = datam;
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
	        this.Alldatat = datat;
          console.log(datat);
          this.displayTable = true;
        },
        error: (e) => console.error(e)
      });
  }

  ExportCSV(): void {
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Sensor Data',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.Alldatah);
    csvExporter.generateCsv(this.Alldatal);
    csvExporter.generateCsv(this.Alldatat);
    csvExporter.generateCsv(this.Alldatam);
  }

}
