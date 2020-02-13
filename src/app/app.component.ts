import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  change2(){
    var menu = document.getElementById("test");
    menu.classList.toggle("darkMode");
    menu.classList.toggle("lightMode");
  }

  changeStyle(){
    var app = document.getElementById("app");
    app.classList.toggle("darkMode");
    app.classList.toggle("lightMode");

    this.change2();
  }

  
  
}
