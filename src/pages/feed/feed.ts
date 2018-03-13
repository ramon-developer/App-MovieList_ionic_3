import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from "../../providers/movie/movie";

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
    MoovieProvider
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

  public lista_filmes = new Array<any>();

  public nome_usuario: string = "Marbet Ramon S.";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MoovieProvider
    ) { } 

  public somaDoisNumeros(num1:number, num2:number): void {

  }

  ionViewDidLoad() {
    this.movieProvider.getPopularMovies().subscribe(
      data=>{
        // const response = (data as any);
        // const objeto_retorno = JSON.parse(response._body);
        // this.lista_filmes = objeto_retorno.results;
        // console.log(objeto_retorno);
        console.log("Filmes pop's",
        this.lista_filmes = data['results']);
      }
      ,error => {
        console.log(error);
      }
    )
  }

}