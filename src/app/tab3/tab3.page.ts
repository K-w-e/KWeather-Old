import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

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
  urlT = [];
  y:number;
  testing = [];
  cityC:string="";

  constructor(public httpClient:HttpClient, public platform:Platform){
    this.platform.ready().then(()=>{
      this.GetCurrentTemperature();
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

  dbCity(){
    //      in / of
    for(let k of this.cities){
      this.urlT[k] = "https://api.openweathermap.org/data/2.5/weather?q="+this.city[k]+"&appid=124e8fe73f164ffb8af4ed5817deb342";
      this.httpClient.get(this.urlT[k]).subscribe((temperaturedata)=>{
        var obj = <any>temperaturedata;
        this.temperatureTEST[k] = ((parseFloat(obj.main.temp)-273.15).toFixed(2)).toString()+"°C";
      })
    }
    console.log(this.cities);
    console.log(this.temperatureTEST);
    console.log(this.urlT);
  }

}
