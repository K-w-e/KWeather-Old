import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
  cityC:string="";
  index:Promise<number>;


  test:string="";
  prova:number;

  constructor(public httpClient:HttpClient, public platform:Platform, public storageService: Storage){
    this.platform.ready().then(()=>{
      this.GetCurrentTemperature();
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

      console.log(temperaturedata);
      if(temperaturedata!=null){
        this.Set();
      }

    })
  }

  saveCity(){
    this.cities[this.i] = this.city;
    this.testing[this.i] = this.temperature;
    this.i++;
   // this.dbCity();
  }

  clickedCity(){
    this.cityC = document.getElementById('city').innerHTML;
    console.log(this.cityC);
  }

  Set(){
    //this.storageService.clear();
   // this.test=this.storageService.length();
   // console.log(this.test);
   this.storageService.set(this.prova.toString(), this.city).then(result => {
      console.log('Data is saved');
      this.Get();
      }).catch(e => {
      console.log("error: " + e);
      });
      this.prova++;
      
   }

  Get(){
    this.storageService.forEach((value: any, key: string, iterationNumber: Number) => {
      /*console.log("key " + key);
      console.log("Total Keys " + this.prova);
      console.log("value " + value);*/

      this.cities[key] = value;
      console.log(this.cities);
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
    console.log(this.temperatureTEST);
  }

  cancella(){
    this.prova=0;
    this.storageService.clear();
    this.Get();
  };
}
