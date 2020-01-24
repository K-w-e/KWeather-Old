import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  city:string="";
  place:string="";
  type:string="";
  icon:string="";
  humidity:string="";
  temperature:string="";


  cities = [];
  i:number=0;
  temperatureTEST = [];
  urlA = [];
  testing = [];

  test:string="";
  prova:number;

  constructor(public httpClient:HttpClient, public platform:Platform, public storageService: Storage){
    this.platform.ready().then(()=>{
      this.Get();
      this.storageService.length().then((keysLength: Number) => {
        this.prova=keysLength.valueOf();
      });
    })
  }

  searchCity(){
    this.GetCurrentTemperature();
  } 

  GetCurrentTemperature(){
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+this.city+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedata)=>{
      var obj = <any>temperaturedata;
      this.place = obj.name;  
      this.type = obj.weather[0].main;
      this.humidity = obj.main.humidity;
      this.icon = "http://openweathermap.org/img/w/"+obj.weather[0].icon+".png";
      this.temperature = ((parseFloat(obj.main.temp)-273.15).toFixed(2)).toString()+"°C";
    })
  }

  Set(){
    this.storageService.set(this.prova.toString(), this.city).then(result => {
      this.prova++;
      this.Get();
      console.log(this.cities);
    }).catch(e => {
      console.log("error: " + e); 
    });        
  }

  Get(){
    this.storageService.forEach((value: any, key: string, iterationNumber: Number) => {
      this.cities[key] = value;
    }).then(
      (result) => {
        this.GetWeatherFromDB();
      });
  }

  GetWeatherFromDB() {
    for(let k in this.cities){
      this.urlA[k] = "https://api.openweathermap.org/data/2.5/weather?q="+this.cities[k]+"&appid=124e8fe73f164ffb8af4ed5817deb342";
      this.httpClient.get(this.urlA[k]).subscribe((temperaturedata)=>{
        var obj = <any>temperaturedata;
        this.temperatureTEST[k] = ((parseFloat(obj.main.temp)-273.15).toFixed(2)).toString()+"°C";
      })
    }
  }

  clearList(){
    this.cities = [];
    this.temperatureTEST = [];
  }

  clearDB(){
    this.prova=0;
    this.storageService.clear();
    this.clearList();
    this.Get();

  }

  removeCity(city){
    let index = this.cities.indexOf(city);
    this.cities.splice(index, 1);
    this.temperatureTEST.splice(index, 1);
    this.storageService.remove(index.toString()); 
    /*this.cities = this.cities.filter(function(el) { 
      return el != null;
    });
    this.temperatureTEST = this.temperatureTEST.filter(function(el){
      return el != null;
    });*/
    this.prova--;
    console.log(this.cities);
    console.log(this.prova);

  }
}
