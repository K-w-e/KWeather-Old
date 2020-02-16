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
}
