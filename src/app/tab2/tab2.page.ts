import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Giorno } from '../Model/Giorno';
import { Chart } from 'chart.js';
import { StatusBar } from '@ionic-native/status-bar';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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



  @ViewChild('lineCanvas', {static: false}) lineCanvas;
  lineChart: any;



  constructor(public httpClient: HttpClient,
    public geolocation: Geolocation,
    public platform: Platform,
    public statusBar: StatusBar){
      this.statusBar.backgroundColorByHexString('#f4f5f8');
    this.platform.ready().then(()=>{
      this.GetCurrentLocation();
      this.showChart();
    })
  }

  GetCurrentLocation(){
    this.geolocation.getCurrentPosition().then((position)=>{
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      this.GetCurrentTemperature(latitude, longitude);
      this.GetTemperatureForecast(latitude, longitude);
      this.GetTemperatureNextWeek(latitude, longitude);
      this.GetTemperatureToday(latitude, longitude);
      this.showChart();
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
      this.speed = obj.wind.speed;
      this.pressure = obj.main.pressure;
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

  GetTemperatureToday(latitude, longitude){
    var date = this.today.getFullYear()+'-'+this.UtilDate((this.today.getMonth()+1))+'-'+this.UtilDate(this.today.getDate());
    var date2 = this.today.getFullYear()+'-'+this.UtilDate((this.today.getMonth()+1))+'-'+this.UtilDate(this.today.getDate()+1);
    
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=124e8fe73f164ffb8af4ed5817deb342";
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
      var y=0;
      for(let x in obj.list){
        if(obj.list[x].dt_txt.includes("12:00:00")){     
          this.temperatureW[y] = ((parseFloat(obj.list[x].main.temp)-273.15).toFixed(2)).toString()+"°C";
          this.typeW[y] = obj.list[x].weather[0].main;
          this.desW[y] = obj.list[x].weather[0].description;
          this.dayW[y]=obj.list[x].dt_txt;
          this.iconW[y] = "http://openweathermap.org/img/w/"+obj.list[0].weather[0].icon+".png";
          y++;
        }
      }
    })
  }

  showChart() {
    var ctx = (<any>document.getElementById('chart')).getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dayW,  //giorni
        datasets: [{
          label: "Test",
          data: this.temperatureW,//tempApp,  //temperature 
        }]
      }
    })
    console.log(chart.data.datasets);
    //console.log(chart.data.labels);
    for (let x of this.temperatureW) {
      chart.update();
   }
    
    
  }

  update(){
    
  // this.barChart.update();
  }
}
