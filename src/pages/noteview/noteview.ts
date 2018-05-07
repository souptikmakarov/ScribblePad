import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/dataprovider';
import { LoggerProvider } from '../../providers/loggerprovider';

@Component({
  selector: 'page-noteview',
  templateUrl: 'noteview.html',
})
export class NoteViewPage {
  @ViewChild('myInput') myInput: ElementRef;
  note = {
    _id:'',
    Title:'',
    Content:{
      Message:''
    }
  };
  deleted = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, private logger: LoggerProvider) {
    this.note = this.navParams.get("note");
  }

  removeNote(){
    this.data.removeNote(this.note._id).subscribe(
      val => {
        if(val["success"]){
          this.logger.InfoLog(val["success"]);
        }else{
          this.logger.ErrorLog(val["error"]);
        }
      },
      response => {
        this.logger.ErrorLog("GET call in error")
      },
      () => {
        this.deleted = true;
        this.navCtrl.pop();
      }
    );
  }

  saveNote(){
    if(this.note.Content.Message != ""){
      var noteId = this.note._id;
      delete this.note["_id"]
      this.data.editNote(noteId,this.note).subscribe(
        val => {
          if(val["success"]){
            this.logger.InfoLog(val["success"]);
          }else{
            this.logger.ErrorLog(val["error"]);
          }
        },
        response => {
          this.logger.ErrorLog("GET call in error")
        }
      );
    }
  }

  ionViewCanLeave(){
    return new Promise((resolve: Function, reject: Function) => {
      if(this.note.Content.Message != "" && !this.deleted){
        var noteId = this.note._id;
        delete this.note["_id"];
        this.data.editNote(noteId,this.note).subscribe(
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
            this.logger.ErrorLog("GET call in error")
              reject();
          }
        );
      }
      resolve();
    });
  }

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }
}
