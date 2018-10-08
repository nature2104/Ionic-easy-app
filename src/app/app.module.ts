import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { hlsPopupService } from "../scripts/service/hlsPopup.service";
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';


import { MyApp } from './app.component';

import {HttpFilter} from "../scripts/filter/http.filter";
import {LocalStorageService} from "../scripts/service/localStorage.service";
import {hlsHttpService} from "../scripts/service/hlsHttp.service";

import { TabsModule } from "../pages/tabs/tabs.module";
import { MasterModule } from "../pages/master/master.module";
import {ModalModule} from "../pages/modal/modal.module"


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      iconMode: 'ios',
      mode: 'ios',
      tabsHideOnSubPages: 'true',
      backButtonText: '返回',
      spinner:'ios'
    }),
    HttpClientModule,
    TabsModule,
    MasterModule,
    ModalModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    hlsPopupService,
    hlsHttpService,
    Toast,
    Dialogs,
    LocalStorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: HttpFilter, multi: true},

  ]
})
export class AppModule {}
