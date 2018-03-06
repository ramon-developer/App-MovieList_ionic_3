import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  public objeto_feed = {
    titulo: "Marbet Ramon S.",
    data: "November 5, 1990",
    descricao: "Estou criando um App incrível!!! ;)",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "1h Ago"
  }

  public nome_usuario: string = "Marbet Ramon S.";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // public somaDoisNumeros(num1:number, num2:number): void {
  //   alert(num1 + num2);
  // }

  ionViewDidLoad() {
    //this.somaDoisNumeros(10, 99); //aqui esta sendo efetuada uma soma entre 10 e 99
  }

}
