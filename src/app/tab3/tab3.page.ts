import { Component, ViewChild, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Platform, ModalController, MenuController } from '@ionic/angular';
import { Temperature } from '../Model/Temperature';
import { TemperatureTime } from '../Model/TemperatureTime';
import { TemperatureService } from '../temperature.service';
import { Giorno } from '../Model/Giorno';
import { Observable, of, from } from 'rxjs';
import { TempTest } from '../Model/temp/TempTest';
import { TempWeek } from '../Model/temp/TempWeek';
import { AirVisual } from '../Model/pollution/AirVisual';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
 /* city:string="";
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
    this.GetTemperatureForecast();
    this.GetTemperatureNextWeek();
    this.GetTemperatureToday();
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
    //this.clearList();
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

*/

 /////////////   OK
 today = new Date();
 temperature: Temperature;
 temperatureWeek: Array<TemperatureTime> = [];
 temperatureTime: Array<TemperatureTime> = [];
 airQuality: string;
 atemperature$ : Observable<TempTest>;
 tempWeek$ : Observable<TempWeek>;
 giorni = [];
 temperatureToday:string="";
 airVisual$ : Observable<AirVisual>;
 descriptionToday: string;
 ////////////
 city: string;
 indice: number;


 constructor(public httpClient:HttpClient, 
   public platform:Platform,
   private modal: ModalController, 
   private temperatureModel: TemperatureService,
   private storageService: Storage){
    this.platform.ready().then(()=>{
      this.Get();
      this.storageService.length().then((keysLength: Number) => {
        this.indice=keysLength.valueOf();
      });
    });
  }

 ngOnInit() {
   console.log("OnInit");   
 }
 
 getAPI(){
   console.log("method");
   this.atemperature$ = this.temperatureModel.getTempS(this.city);
   this.tempWeek$ = this.temperatureModel.getTemperatureWeekS(this.city);
   this.airVisual$ = this.temperatureModel.GetAQIS(this.city);
   this.getGiorni();
   this.getTemperatureC();
   this.getAirQuality();

 }

 getTemperatureC(){
  this.atemperature$.subscribe(temp => (
    this.setTemperatureC(temp)
  ));
}

setTemperatureC(temp : TempTest){
 this.temperatureToday = ((parseFloat(temp.main.temp.toString())-273.15).toFixed(2)).toString()+"°C";
 this.descriptionToday = temp.weather[0].description;
 this.SetGraphic(this.descriptionToday);
}

 getAirQuality(){
   this.airVisual$.subscribe(av => (
     this.setAirQuality(av)
   ));

 }

 getGiorni(){
   this.tempWeek$.subscribe(tempWeek => (
     this.setGiorni(tempWeek)
   ));

 }

 setGiorni(t : TempWeek){
   var date = this.today.getFullYear()+'-'+this.UtilDate((this.today.getMonth()+1))+'-'+this.UtilDate(this.today.getDate());
   var date2 = this.today.getFullYear()+'-'+this.UtilDate((this.today.getMonth()+1))+'-'+this.UtilDate(this.today.getDate()+1);
   
   console.log("OK + "  + t.city.name);
   for(let x in t.list){
     if(t.list[x].dt_txt.includes(date) || t.list[x].dt_txt.includes(date2)){
       console.log(t.list[x])
       let temperatureT = ((parseFloat(t.list[x].main.temp)-273.15).toFixed(2)).toString()+"°C";
       let typeT = t.list[x].weather[0].main;
       let desT = t.list[x].weather[0].description;
       let iconT = this.checkIcon(desT);
       var time = new Date(t.list[x].dt_txt);
       this.giorni[x] = (new Giorno(temperatureT, typeT, iconT, time));
     }
   }  
 }

 checkIcon(desT): string{
  if(desT=="clear sky")
    return "assets/img/sun.png";
  else if(desT=="few clouds")
    return "assets/img/cloud-sunMore.png";
  else if(desT=="broken clouds" || desT=="scattered clouds" || desT=="overcast clouds")
    return "assets/img/cloud.png";
  else if(desT.includes("rain"))
    return "assets/img/rain.png";
}

 setAirQuality(av : AirVisual){
   this.airQuality = (av.data.current.pollution.aqius).toString();
 }

 UtilDate(date){
  let aNumber : number = Number(date);
  if(aNumber<10)
    return "0"+aNumber;
  else
    return aNumber;
  }

  closeModal(){
    this.modal.dismiss();
  }

  Set(){
    this.storageService.set(this.city, this.city).then(result => {
      this.indice++;
      this.Get();
    }).catch(e => {
      console.log("error: " + e); 
    });        
  }

  Get(){
    let cities = [];
    this.storageService.forEach((value: any, key: string, iterationNumber: Number) => {
      cities[(iterationNumber.valueOf()-1).toString()] = value;
    })/*.then(
      (result) => {
        this.GetWeatherFromDB();
      });*/
  }

  SetGraphic(description){
    if(description=="clear sky")
    {
      console.log("CLEAR SKY");
      document.getElementById("today2").classList.add("clear_sky");
    }
    else if(description=="few clouds")
    {
      console.log("FEW CLOUDS");
      document.getElementById("today2").classList.add("few_clouds");
    }
    else if(description=="scattered clouds")
    {
      console.log("SCATTERED CLOUDS");
      document.getElementById("today2").classList.add("scattered_clouds");
    }
    else if(description=="broken clouds")
    {
      console.log("BROKEN CLOUDS");
      document.getElementById("today2").classList.add("broken_clouds");
    }
    else if(description=="rain" || description.includes("rain"))
    {
      console.log("RAIN");
      document.getElementById("today2").classList.add("rain");
    }
    else if(description=="overcast clouds")
    {
      console.log("OVERCAST CLOUDS");
      document.getElementById("today2").classList.add("broken_clouds");
    }

  }
}
