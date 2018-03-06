import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from "../../providers/movie/movie";

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
  providers: [
    MovieProvider
  ]
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider
    ) { } 

  public somaDoisNumeros(num1:number, num2:number): void {

  }

  ionViewDidLoad() {
    this.movieProvider.getLatestMovies().subscribe(
      (data) => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        console.log(objeto_retorno);
      }, 
      (error) => {
        console.log(error);
      }
    )
  }

}
