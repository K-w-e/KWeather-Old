import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Giorno } from '../Model/Giorno';

@Component({
  selector: 'app-modal-city',
  templateUrl: './modal-city.page.html',
  styleUrls: ['./modal-city.page.scss'],
})
export class ModalCityPage implements OnInit {
  city:string;

  constructor(private modal: ModalController, public httpClient: HttpClient) {

   }

  ngOnInit() {
    console.log(this.city);
    this.GetCurrentTemperature();
    this.GetTemperatureForecast();
    this.GetTemperatureNextWeek();
    this.GetTemperatureToday();
    this.GetAQI();
  }

  closeModal(){
    this.modal.dismiss();
  }

  place:string="";
  type:string="";
  icon:string="";
  temperature:string="";
  des:string="";
  humidity:string="";
  speed:string="";
  pressure:string="";

  typeF:string="";
  temperatureF:string="";
  desF:string="";
  iconF:string="";

  typeW = [];
  temperatureW = [];
  desW = [];
  iconW = [];
  dayW = [];

  today = new Date();
  temperatureT = [];
  desT = [];
  iconT = [];
  typeT = [];
  giorni = [];

  AirQuality:string="";

  GetCurrentTemperature(){
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+this.city+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedata)=>{
      var obj = <any>temperaturedata;
      this.place = obj.name;
      this.type = obj.weather[0].main;
      this.icon = "http://openweathermap.org/img/w/"+obj.weather[0].icon+".png";
      this.des = obj.weather[0].description;
      this.temperature = ((parseFloat(obj.main.temp)-273.15).toFixed(2)).toString()+"°C";
      this.humidity = obj.main.humidity;
      this.speed = obj.wind.speed;
      this.pressure = obj.main.pressure;

      this.SetGraphic(this.des);
      /*
        01x - Clear Sky
        02x - Few Clouds
        03x - Scattered Clouds
        04x - Broken Clouds
        09x - Shower Rain
        10x - Rain
        11x - Thunderstorm
        13x - Snow
        50x - Mist

        x --> d/n
        d - day
        n - night
      */
      console.log(this.icon);
      if(this.icon=="http://openweathermap.org/img/w/01d.png")
        document.getElementById("today").classList.add('sun');
      else if(this.icon=="http://openweathermap.org/img/w/04d.png") 
        document.getElementById("today").classList.add('cloud');
    })
  }

  SetGraphic(description){
    if(description=="clear sky")
    {
      console.log("CLEAR SKY");
      document.getElementById("today").classList.add("clear_sky");
    }
    else if(description=="few clouds")
    {
      console.log("FEW CLOUDS");
      document.getElementById("today").classList.add("few_clouds");
    }
    else if(description=="scattered clouds")
    {
      console.log("SCATTERED CLOUDS");
      document.getElementById("today").classList.add("scattered_clouds");
    }
    else if(description=="broken clouds")
    {
      console.log("BROKEN CLOUDS");
      document.getElementById("today").classList.add("broken_clouds");
    }
    else if(description=="rain")
    {
      console.log("RAIN");
      document.getElementById("today").classList.add("rain");
    }

  }

  //Da sistemare, deve prendere le prossime ore!
  GetTemperatureToday(){
    var date = this.today.getFullYear()+'-'+this.UtilDate((this.today.getMonth()+1))+'-'+this.UtilDate(this.today.getDate());
    var date2 = this.today.getFullYear()+'-'+this.UtilDate((this.today.getMonth()+1))+'-'+this.UtilDate(this.today.getDate()+1);
    
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+this.city+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedataW)=>{
      var obj = <any>temperaturedataW;
      for(let x in obj.list){
        if(obj.list[x].dt_txt.includes(date) || obj.list[x].dt_txt.includes(date2)){
          this.temperatureT[x] = ((parseFloat(obj.list[x].main.temp)-273.15).toFixed(2)).toString()+"°C";
          this.typeT[x] = obj.list[x].weather[0].main;
          this.desT[x] = obj.list[x].weather[0].description;
          this.iconT[x] = "http://openweathermap.org/img/w/"+obj.list[x].weather[0].icon+".png";
          var time = new Date(obj.list[x].dt_txt);
          this.giorni[x] = new Giorno(this.temperatureT[x], this.typeT[x], this.iconT[x], time);
        }
      }   
    })
  }
  
  UtilDate(date){
    var aNumber : number = Number(date);
    if(aNumber<10)
      return "0"+aNumber;
    else
      return aNumber;
  }

  GetTemperatureForecast(){
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+this.city+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedataF)=>{
      var obj = <any>temperaturedataF;
      this.temperatureF = ((parseFloat(obj.list[0].main.temp)-273.15).toFixed(2)).toString()+"°C";
      this.typeF = obj.list[0].weather[0].main;
      this.desF = obj.list[0].weather[0].description;
      this.iconF = "http://openweathermap.org/img/w/"+obj.list[0].weather[0].icon+".png";
    })
  }

  GetTemperatureNextWeek(){
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+this.city+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedataW)=>{
      let y=0;
      var obj = <any>temperaturedataW;
      for(let x in obj.list){
        if(obj.list[x].dt_txt.includes("12:00:00")){
          this.temperatureW[y] = Math.round((parseFloat(obj.list[x].main.temp)-273.15)).toString()+"°C";
          this.typeW[y] = obj.list[x].weather[0].main;
          this.desW[y] = obj.list[x].weather[0].description;
          this.dayW[y]=obj.list[x].dt_txt;
          this.iconW[y] = "http://openweathermap.org/img/w/"+obj.list[0].weather[0].icon+".png";
          y++;
        }
      }
    })
  }

  GetAQI(){
    var url = "https://api.airvisual.com/v2/nearest_city?q="+this.city+"&key=ece4a0d5-c9d1-49eb-91b9-544116deb7bf"
    this.httpClient.get(url).subscribe((API)=>{
      var obj = <any>API;
      this.AirQuality = obj.data.current.pollution.aqius;
    }) 
  }

  /*toggleMenu(){
    this.menuCtrl.toggle();
    var toggle = document.getElementById("theme");
  }

  public changeStyle(){
    var app = document.getElementById("app");
    app.classList.toggle("darkMode");
    app.classList.toggle("lightMode");
  }*/

}
