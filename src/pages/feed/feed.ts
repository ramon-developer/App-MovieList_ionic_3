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
    qntd_comments: 4,
    time_comment: "1h Ago"
  }

  public lista_filmes = new Array<any>();
  public page = 1;
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

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

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.loadMovies(true);
  }

   loadMovies(newpage: boolean = false){
    this.presentLoading();
    this.movieProvider.getPopularMovies(this.page).subscribe(
      data=>{

        if(newpage){
          this.lista_filmes = this.lista_filmes.concat(data['results']);
          console.log(this.page);
          console.log(this.lista_filmes);
          this.infiniteScroll.complete();
        }else{
          this.lista_filmes  = data['results'];
        }

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