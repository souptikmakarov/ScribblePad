import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/dataprovider';
import { LoggerProvider } from '../../providers/loggerprovider';

@Component({
  selector: 'page-addnote',
  templateUrl: 'addnote.html',
})
export class AddNote {
  @ViewChild('myInput') myInput: ElementRef;
  note = {
    Title:'',
    Content:{
      Message:''
    }
  };
  discarded = false;
  constructor(public navCtrl: NavController, public data: DataProvider, private logger: LoggerProvider) {
  }

  ionViewCanLeave(){
    return new Promise((resolve: Function, reject: Function) => {
      if(this.note.Content.Message != "" && !this.discarded){
        this.data.addNote(this.note).subscribe(
          val => {
            if(val["success"]){
              this.logger.InfoLog(val["success"]);
              resolve();
            }else{
              this.logger.ErrorLog(val["error"]);
              reject();
            }
          },
          response => {
            this.logger.ErrorLog("GET call in error");
              reject();
          }
        );
      }else{
        resolve();      
      }
    });
  }

  discard(){
    this.discarded = true;
    this.navCtrl.pop();
  }
  
  resize() {
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }
}
