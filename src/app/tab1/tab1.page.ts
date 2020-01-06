import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cities = ["Aosta", "Torino", "Genova", "Milano", "Trento", "Venezia", "Trieste", "Bologna", 
  "Firenze", "Perugia", "Ancona", "Roma", "L'Aquila", "Campobasso", "Napoli", "Bari", "Potenza", "Catanzaro",
  "Palermo", "Cagliari"];
  temperature = [];
  n:number=0;

    constructor(public httpClient:HttpClient, public platform:Platform){
    this.platform.ready().then(()=>{
      this.GetCurrentTemperature();
    })
  }

  GetCurrentTemperature(){
    this.n=0;
    for (let city of this.cities) {
      var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=124e8fe73f164ffb8af4ed5817deb342";
      this.httpClient.get(url).subscribe((temperaturedata)=>{
      var obj = <any>temperaturedata;
      this.temperature[this.n] = ((parseFloat(obj.main.temp)-273.15).toFixed(2)).toString()+"°C";
      this.n++;
    })
  }
    
  }

}
