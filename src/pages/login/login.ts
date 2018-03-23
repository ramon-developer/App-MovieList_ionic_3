import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterProfilePage } from '../registerProfile/registerProfile';
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

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
    private facebook: Facebook
  ) {
  }

  ionViewDidLoad() {
    console.log('Página de Login');
  }

  async login(user: User) {
    try{
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
          this.navCtrl.setRoot(TabsPage); //push for setRoot - ProfilePage
      }
    }
      catch (e) {
        console.error(e);
      }

    }

  register() {
    this.navCtrl.push(RegisterPage);
    console.log('registrar...');
  }

  loginWithFacebook(){

      // let provider = new firebase.auth.FacebookAuthProvider();

      // firebase.auth().signInWithRedirect(provider).then(()=>{
      //   firebase.auth().getRedirectResult().then((result)=>{
      //     alert(JSON.stringify(result));
      //   }).catch(function(error){
      //     alert(JSON.stringify(error))
      //   });
      // })

      this.facebook.login(["email"]).then((loginResponse) =>{

        let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
        
        firebase.auth().signInWithCredential(credential).then((info) => {
          alert(JSON.stringify(info));
        })
      })

  }


}
