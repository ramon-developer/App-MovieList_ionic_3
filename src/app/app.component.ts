import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../providers/config/config';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';//test

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {

  getComponent(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  rootPage:any;
  pages: Array<{title: string, component: any}> 

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    configProvider: ConfigProvider
  ) {

    //test
    //used for an example of ngFor and navigation
    this.pages = [
      { title:'Login', component: LoginPage }
    ];
    //test

    platform.ready().then(() => {
      let config = configProvider.getConfigData();
      if (config == null) {
        this.rootPage = IntroPage;
        configProvider.setconfigData(false);
      } else {
        this.rootPage = IntroPage; //TabsPage
      }
      console.log(config);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

