import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Platform } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
=======
import { Platform, ModalController } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import * as $ from 'jquery';
import { ModalCityPage } from '../modal-city/modal-city.page';
import { Giorno } from '../Model/Giorno';

import {  } from '../app.component';
>>>>>>> 74aa774f61ad52cd76f068d977b4fdfe68d17873

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
  des:string="";

  cities = [];
  i:number=0;
  temperatureTEST = [];
  urlA = [];
  testing = [];

  test:string="";
  indice:number;

<<<<<<< HEAD
  constructor(public httpClient:HttpClient, public platform:Platform, public storageService: Storage){
=======
  cityModal:string="";
  today = new Date();

  temperatureT = [];
  typeT = [];
  iconT = [];
  desT = [];
  giorni = [];

  temperatureF:string="";
  typeF:string="";
  iconF:string="";
  desF:string="";

  temperatureW = [];
  desW = [];
  iconW = [];
  typeW = [];
  dayW = [];

  constructor(public httpClient:HttpClient, public platform:Platform, public storageService: Storage, private modal: ModalController,
    private modal2: ModalController){
>>>>>>> 74aa774f61ad52cd76f068d977b4fdfe68d17873
    this.platform.ready().then(()=>{
      this.Get();
      this.storageService.length().then((keysLength: Number) => {
        this.indice=keysLength.valueOf();
      });
      document.getElementById("today").style.visibility = "hidden";
    })
  }

  searchCity(){
    this.GetCurrentTemperature();
<<<<<<< HEAD
=======
    this.GetTemperatureForecast();
    this.GetTemperatureNextWeek();
    this.GetTemperatureToday();
>>>>>>> 74aa774f61ad52cd76f068d977b4fdfe68d17873
  } 

  GetCurrentTemperature(){
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+this.city+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedata)=>{
      var obj = <any>temperaturedata;
      this.place = obj.name;  
      this.type = obj.weather[0].main;
      this.humidity = obj.main.humidity;
      this.des = obj.weather[0].description;
      this.icon = "http://openweathermap.org/img/w/"+obj.weather[0].icon+".png";
      this.temperature = ((parseFloat(obj.main.temp)-273.15).toFixed(2)).toString()+"°C";
<<<<<<< HEAD
    })
  }

=======
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

>>>>>>> 74aa774f61ad52cd76f068d977b4fdfe68d17873
  Set(){
    this.storageService.set(this.city, this.city).then(result => {
      this.indice++;
      this.Get();
      console.log(this.cities);
      console.log(this.indice);
    }).catch(e => {
      console.log("error: " + e); 
    });        
  }

  Get(){
<<<<<<< HEAD
    this.clearList();
=======
    //this.clearList();
>>>>>>> 74aa774f61ad52cd76f068d977b4fdfe68d17873
    this.storageService.forEach((value: any, key: string, iterationNumber: Number) => {
      this.cities[(iterationNumber.valueOf()-1).toString()] = value;
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

<<<<<<< HEAD
  clearList(){
    this.cities = [];
    this.temperatureTEST = [];
  }

  clearDB(){
    this.indice=0;
    this.storageService.clear();
    this.clearList();
    this.Get();

  }

  removeCity(city){
    let index = this.cities.indexOf(city);
    this.cities.splice(index, 1);
    this.temperatureTEST.splice(index, 1);
    this.storageService.remove(city); 
    this.Get();
    this.indice--;
    console.log(this.cities);
  }
}
=======
  UtilDate(date){
    var aNumber : number = Number(date);
    if(aNumber<10)
      return "0"+aNumber;
    else
      return aNumber;
  }

  removeCity(city){
    let index = this.cities.indexOf(city);
    this.cities.splice(index, 1);
    this.temperatureTEST.splice(index, 1);
    this.storageService.remove(city); 
    this.Get();
    this.indice--;
    console.log(this.cities);
  }

  remove(){
    $(".btn").each(function() {
      $(this).toggleClass("remove");
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

  cityClick(cityM){
    this.openModalCity();
    this.cityModal = cityM;
    console.log(this.cityModal);
  }

  async openModalCity(){
    const myModal = await this.modal2.create({
      component: ModalCityPage,
      componentProps: { 
        cityM: this.cityModal,
        prova: 'aiuto'
      }
    });
    await myModal.present();
  }


}
>>>>>>> 74aa774f61ad52cd76f068d977b4fdfe68d17873
