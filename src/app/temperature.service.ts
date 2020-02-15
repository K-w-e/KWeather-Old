import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Temperature } from './Model/Temperature';
import { TemperatureTime } from './Model/TemperatureTime';
import { Giorno } from './Model/Giorno';
import { WeekDay } from '@angular/common';
import { Observable, of } from 'rxjs';
import { TempTest } from './Model/temp/TempTest';
import { TempWeek } from './Model/temp/TempWeek';
import { AirVisual } from './Model/pollution/AirVisual';


@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(private httpClient: HttpClient) { }

  getTest(latitude, longitude): Observable<TempTest>{
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    return this.httpClient.get<TempTest>(url);
  }

  getTempS(city): Observable<TempTest>{
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    return this.httpClient.get<TempTest>(url);
  }

  getTemperatureWeek(latitude,longitude): Observable<TempWeek>{
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    return this.httpClient.get<TempWeek>(url);
  }

  getTemperatureWeekS(city): Observable<TempWeek>{
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    return this.httpClient.get<TempWeek>(url);
  }

  GetAQI(latitude, longitude): Observable<AirVisual>{
    var url = "https://api.airvisual.com/v2/nearest_city?lat="+latitude+"&lon="+longitude+"&key=ece4a0d5-c9d1-49eb-91b9-544116deb7bf"
    return this.httpClient.get<AirVisual>(url);
  }

  GetAQIS(city): Observable<AirVisual>{
    var url = "https://api.airvisual.com/v2/nearest_city?q="+city+"&key=ece4a0d5-c9d1-49eb-91b9-544116deb7bf"
    return this.httpClient.get<AirVisual>(url);
  }

  /*
  GetCurrentTemperature(latitude, longitude): any{
    let temperature: Temperature;
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=124e8fe73f164ffb8af4ed5817deb342";
 //   try{
      this.httpClient.get(url).subscribe((temperaturedata) => {
        let obj = <any>temperaturedata;
        let place: string = obj.name;
        let type: string = obj.weather[0].main;
        let icon: string = "http://openweathermap.org/img/w/"+obj.weather[0].icon+".png";
        let des: string = obj.weather[0].description;
        let temp: string = ((parseFloat(obj.main.temp)-273.15).toFixed(2)).toString()+"°C";
        let humidity: string = obj.main.humidity;
        let speed: string = obj.wind.speed;
        let pressure: string = obj.main.pressure;

        temperature = new Temperature(place, temp, des, icon, type, humidity, speed, pressure);
       // console.log(temperaturedata);
      //  console.log(temperature);
       // return temperaturedata;
       return temperature;
        
      })
      //return temperature;
  /*  }
    catch(error){
      console.log("ERRORE CATCH");
      return null;
    }
    
      GetTemperatureNextWeek(latitude, longitude): TemperatureTime[]{
    let TemperaturesTime:Array<TemperatureTime> = [];
    let today = new Date();
   
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=124e8fe73f164ffb8af4ed5817deb342";
    this.httpClient.get(url).subscribe((temperaturedataW)=>{
      let obj = <any>temperaturedataW;
      for(let x in obj.list){
        let place: string = obj.name;
        let temperatureToday: string = ((parseFloat(obj.list[x].main.temp)-273.15).toFixed(2)).toString()+"°C";
        let typeToday: string = obj.list[x].weather[0].main;
        let desToday: string = obj.list[x].weather[0].description;
        let iconToday: string = "http://openweathermap.org/img/w/"+obj.list[x].weather[0].icon+".png";
        let time = new Date(obj.list[x].dt_txt);
        let days = new Giorno(temperatureToday, typeToday, iconToday, time);
        let temperatureTime = new TemperatureTime(place, temperatureToday, typeToday, iconToday, desToday, null, null, null, time, days)
        TemperaturesTime.push(temperatureTime);
      }
    })
    return TemperaturesTime;
  }}*/
  
}
