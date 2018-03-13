import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from "../../providers/movie/movie";
import { MovieDetailsPage } from '../movie-details/movie-details';

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
  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
    ) { } 

    //funcoes de carregar e fechar o loading
    presentLoading() {
      this.loader = this.loadingCtrl.create({
        content: "Carregando...",
      });
      this.loader.present();
    }

    hideLoading() {
      this.loader.dismiss();
    }
    
  public somaDoisNumeros(num1:number, num2:number): void {

  }

  doRefresh(refresher) {
    this.refresher= refresher;
    this.isRefreshing = true;
    this.loadMovies();


  }

  ionViewDidEnter() {
    this.loadMovies();
  }

  openDetails(filme) {
    console.log(filme);
    this.navCtrl.push(MovieDetailsPage, {id: filme.id });
  }

  loadMovies(){
    this.presentLoading();
    this.movieProvider.getPopularMovies().subscribe(
      data=>{
        // const response = (data as any);
        // const objeto_retorno = JSON.parse(response._body);
        // this.lista_filmes = objeto_retorno.results;
        // console.log(objeto_retorno);
        console.log("Filmes pop's",
        this.lista_filmes = data['results']);
        this.hideLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
      ,error => {
        console.log(error);
        this.hideLoading();
      }
    )
  }
}