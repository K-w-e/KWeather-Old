import { Component, OnInit} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform, ModalController, MenuController } from '@ionic/angular';
import { Tab3Page } from '../tab3/tab3.page';
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
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  today = new Date();
  temperature: Temperature;
  temperatureWeek: Array<TemperatureTime> = [];
  temperatureTime: Array<TemperatureTime> = [];
  airQuality: string;
  latitude;
  longitude;
  atemperature$ : Observable<TempTest>;
  tempWeek$ : Observable<TempWeek>;
  giorni = [];
  temperatureToday:string="";
  airVisual$ : Observable<AirVisual>;
  descriptionToday: string;

  constructor(public httpClient:HttpClient, 
    public geolocation:Geolocation, 
    public platform:Platform,
    private modal: ModalController, 
    public menuCtrl: MenuController,
    private temperatureModel: TemperatureService){
  }

  ngOnInit() {
    this.getAPI();
  }
  
  getAPI(){
    this.geolocation.getCurrentPosition().then((position)=>{
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.atemperature$ = this.temperatureModel.getTest(this.latitude, this.longitude);
    this.tempWeek$ = this.temperatureModel.getTemperatureWeek(this.latitude, this.longitude);
    this.airVisual$ = this.temperatureModel.GetAQI(this.latitude, this.longitude);
    this.getGiorni();
    this.getTemperatureC();
    this.getAirQuality();
    });
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

  setGiorni(t : TempWeek){
    let date = this.today.getFullYear()+'-'+this.UtilDate((this.today.getMonth()+1))+'-'+this.UtilDate(this.today.getDate());
    let date2 = this.today.getFullYear()+'-'+this.UtilDate((this.today.getMonth()+1))+'-'+this.UtilDate(this.today.getDate()+1);
    
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

  UtilDate(date){
    let aNumber : number = Number(date);
    if(aNumber<10)
      return "0"+aNumber;
    else
      return aNumber;
  }

  SetGraphic(description){
    utils.SetGraphic(description, document.getElementById("today"));
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  public changeStyle(){
    let app = document.getElementById("app");
    app.classList.toggle("darkMode");
    app.classList.toggle("lightMode");
  }

  async openModal(){
    const myModal = await this.modal.create({
      component: Tab3Page
    });
    await myModal.present();
  }
}
