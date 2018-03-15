import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  jumpLogin() {
    this.navCtrl.push(TabsPage); //push for setRoot
  }

  async login(user: User) {
    try{
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
          this.navCtrl.push(TabsPage); //push for setRoot
      }
    }
      catch (e) {
        console.error(e);
      }

  }

  register() {
    this.navCtrl.push(RegisterPage);
    console.log('register...');
  }
}
