import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  place:string="";
  type:string="";
  icon:string="";
  temperature:string="";
  des:string="";
  humidity:string="";

  typeF:string="";
  temperatureF:string="";
  desF:string="";
  iconF:string="";

  week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  typeW = [];
  temperatureW = [];
  desW = [];
  iconW = [];

  constructor(public httpClient:HttpClient, public geolocation:Geolocation, public platform:Platform){
    this.platform.ready().then(()=>{
      this.GetCurrentLocation();
    })
  }

  GetCurrentLocation(){
    this.geolocation.getCurrentPosition().then((position)=>{
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      this.GetCurrentTemperature(latitude, longitude);
      this.GetTemperatureForecast(latitude, longitude);
      this.GetTemperatureNextWeek(latitude, longitude);
    })
  }

  GetCurrentTemperature(latitude, longitude){
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedata)=>{
      var obj = <any>temperaturedata;
      this.place = obj.name;
      this.type = obj.weather[0].main;
      this.icon = "http://openweathermap.org/img/w/"+obj.weather[0].icon+".png";
      this.des = obj.weather[0].description;
      this.temperature = ((parseFloat(obj.main.temp)-273.15).toFixed(2)).toString()+"°C";
      this.humidity = obj.main.humidity;
    })
  }
  
  GetTemperatureForecast(latitude, longitude){
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedataF)=>{
      var obj = <any>temperaturedataF;
      this.temperatureF = ((parseFloat(obj.list[0].main.temp)-273.15).toFixed(2)).toString()+"°C";
      this.typeF = obj.list[0].weather[0].main;
      this.desF = obj.list[0].weather[0].description;
      this.iconF = "http://openweathermap.org/img/w/"+obj.list[0].weather[0].icon+".png";
    })
  }

  GetTemperatureNextWeek(latitude, longitude){
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedataW)=>{
      var obj = <any>temperaturedataW;
      for(let x in this.week){
        this.temperatureW[x] = ((parseFloat(obj.list[x].main.temp)-273.15).toFixed(2)).toString()+"°C";
        this.typeW[x] = obj.list[x].weather[0].main;
        this.desW[x] = obj.list[x].weather[0].description;
        this.iconW[x] = "http://openweathermap.org/img/w/"+obj.list[0].weather[0].icon+".png";
      }
    })
  }
}
