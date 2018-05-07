import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NoteViewPage } from '../pages/noteview/noteview';
import { AddNote } from '../pages/addnote/addnote';
import { HttpClientModule } from '@angular/common/http';
import { DataProvider } from '../providers/dataprovider';
import { LoggerProvider } from '../providers/loggerprovider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NoteViewPage,
    AddNote
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NoteViewPage,
    AddNote
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataProvider,
    LoggerProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
