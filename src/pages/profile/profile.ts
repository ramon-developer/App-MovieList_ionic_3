import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterProfilePage } from '../registerProfile/registerProfile';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  profileData : AngularFireObject<Profile>


  constructor(    
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {

      if (data && data.email && data.uid){
        this.toast.create({
          message: `Olá, ${data.email}`,
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

  updateProfile() {
     this.navCtrl.setRoot(RegisterProfilePage)
    }
}


