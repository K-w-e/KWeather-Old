import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Platform, ModalController } from '@ionic/angular';
import { Temperature } from '../Model/Temperature';
import { TemperatureTime } from '../Model/TemperatureTime';
import { TemperatureService } from '../temperature.service';
import { Giorno } from '../Model/Giorno';
import { Observable } from 'rxjs';
import { TempTest } from '../Model/temp/TempTest';
import { TempWeek } from '../Model/temp/TempWeek';
import { AirVisual } from '../Model/pollution/AirVisual';
import { utils } from '../utils';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
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
 
 getAPI(){
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
   let date = this.today.getFullYear()+'-'+utils.UtilDate((this.today.getMonth()+1))+'-'+utils.UtilDate(this.today.getDate());
   let date2 = this.today.getFullYear()+'-'+utils.UtilDate((this.today.getMonth()+1))+'-'+utils.UtilDate(this.today.getDate()+1);
   
   for(let x in t.list){
     if(t.list[x].dt_txt.includes(date) || t.list[x].dt_txt.includes(date2)){
       let temperatureT = ((parseFloat(t.list[x].main.temp)-273.15).toFixed(2)).toString()+"°C";
       let typeT = t.list[x].weather[0].main;
       let desT = t.list[x].weather[0].description;
       let iconT = this.checkIcon(desT);
       let time = new Date(t.list[x].dt_txt);
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
    })
  }

  SetGraphic(description){
    utils.SetGraphic(description, document.getElementById("today2"));
  }
}
