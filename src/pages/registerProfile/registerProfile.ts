import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { TabsPage } from '../tabs/tabs';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-registerProfile',
  templateUrl: 'registerProfile.html',
  providers: [
    Camera
  ]
})
export class RegisterProfilePage {

  rootPage = ProfilePage;
  profile = {} as Profile;
  img= "";

  constructor(
    private afAuth: AngularFireAuth,
    private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera
  ) {
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  ionViewDidLoad() {
    console.log('Página de Perfil.');
  }

  createProfile() {
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDataBase.object(`profile/${auth.uid}`).set(this.profile).then(() => this.navCtrl.setRoot(this.rootPage))
      })
  }


}
