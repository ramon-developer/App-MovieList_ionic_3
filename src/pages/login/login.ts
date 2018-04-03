import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterProfilePage } from '../registerProfile/registerProfile';
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs/Observable';

firebase.initializeApp(FIREBASE_CONFIG)//TEST

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usr: Observable<firebase.User>;

  user = {} as User;

  isLoggedIn:boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private facebook: Facebook,
    private googlePlus: GooglePlus
  ) {
    this.usr = this.afAuth.authState;

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

      this.facebook.login(["email"]).then(loginResponse=>{

        let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
        
        firebase.auth().signInWithCredential(credential).then(info=> {
          alert(JSON.stringify(info));

          this.navCtrl.setRoot(TabsPage);

        }).catch(ferr=>{
          alert("firebase error")
        })

      }).catch(err=>{
        alert(JSON.stringify(err));
      })

  }



  // loginWithGoogle() {
  //   this.googlePlus.login({})
  //     .then(res => {
  //       console.log(res);
  //       this.user.displayName = res.displayName;
  //       this.user.email = res.email;
  //       this.user.familyName = res.familyName;
  //       this.user.givenName = res.givenName;
  //       this.user.userId = res.userId;
  //       this.user.imageUrl = res.imageUrl;

  //       this.isLoggedIn = true;
  //       alert("entrou")

  //     })
  //     .catch(err => console.error(err));
  // }

  // logout() {
  //   this.googlePlus.logout()
  //     .then(res => {
  //       console.log(res);
  //       this.user.displayName = "";
  //       this.user.email = "";
  //       this.user.familyName = "";
  //       this.user.givenName = "";
  //       this.user.userId = "";
  //       this.user.imageUrl = "";

  //       this.isLoggedIn = false;
  //     })
  //     .catch(err => console.error(err));
  // }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {

      const gplusUser = await this.googlePlus.login({
        'webClientId': '878195412908-jmbjtlu82nv4l7pcm6a44e46001dmtb4.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
      // let result = this.afAuth.auth.signInWithCredential(
      //   firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
      // if (result) {
      // return this.navCtrl.setRoot(TabsPage);
      // }

    } catch(err) {
      console.log(err)
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

      this.navCtrl.setRoot(TabsPage);


    } catch(err) {
      console.log(err)
    }

  }

  signOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.googlePlus.logout();
      this.googlePlus.disconnect(); //test disconnect google plus
    }
  }

}
