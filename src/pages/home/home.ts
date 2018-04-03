import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Profile } from '../../models/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  profileData : AngularFireObject<Profile>

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {

      if (data && data.email && data.uid){
        this.toast.create({
          message: `Olá, ${data.displayName}`,
          duration: 3000
        }).present();

        this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      } 
      else {
        // this.toast.create({
        //   message: `Não encontrou a autenticacao`,
        //   duration: 3000
        // }).present();
        console.log('ocorreu algum erro, verificar.');
      }
    })
  }
}


