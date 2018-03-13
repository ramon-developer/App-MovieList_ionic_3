import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
  providers: [MoovieProvider]
})
export class MovieDetailsPage {

  public filme;
  public filmeid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MoovieProvider
  ) {
  }

  ionViewDidLoad() {
    this.filmeid = this.navParams.get("id");
    this.movieProvider.getMoviesDetail(this.filmeid).subscribe(data=>{
    //   let retorno = (data as any)._body;
    //   this.filme = JSON.parse(retorno);
    let retorno = (data as any);
    if(typeof retorno != 'object')
        retorno = JSON.parse(retorno._body);
    this.filme  = retorno;
    }, error =>{
      console.log(error);
    })
  }

}
