import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/dataprovider';
import { NoteViewPage } from '../noteview/noteview';
import { AddNote } from '../addnote/addnote';
import { LoggerProvider } from '../../providers/loggerprovider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public notes: any;
  constructor(public navCtrl: NavController, public data: DataProvider, public logger: LoggerProvider) {
    this.getNotes();
  }

  getNotes(){
    this.data.getAllNotes().subscribe(
      val => {
          this.notes = val;
      },
      response => {
        this.logger.ErrorLog("GET call in error")
      }
    );
  }

  showNote(note){
    this.notes = [];
    this.navCtrl.push(NoteViewPage, {"note" : note});
  }

  deleteNote(note){
    this.data.removeNote(note._id).subscribe(
      val => {
        if(val["success"]){
          this.logger.InfoLog(val["success"]);
        }else{
          this.logger.ErrorLog(val["error"]);
        }
      },
      response => {
        this.logger.ErrorLog("GET call in error");
      },
      () => {
        this.getNotes();
      }
    );
  }

  ionViewWillEnter() { 
    this.getNotes();
  }

  ionViewDidEnter() {
    this.getNotes();
  }

  addNote(){
    this.notes = [];
    this.navCtrl.push(AddNote);
  }
}
