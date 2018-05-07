import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
@Injectable()
export class LoggerProvider {
    private isAndroid;
    constructor(public plt: Platform, private toastCtrl: ToastController) {
        this.isAndroid = this.plt.is('android');
    }
    
    public InfoLog(msg){
        if (this.isAndroid)
            this.presentToast(msg)
        else
            console.log(msg);
    }

    public ErrorLog(msg){
        if (this.isAndroid)
            this.presentToast("Error: " + msg)
        else
            console.error(msg);
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'bottom'
        });
      
        // toast.onDidDismiss(() => {
        //   console.log('Dismissed toast');
        // });
      
        toast.present();
      }
}