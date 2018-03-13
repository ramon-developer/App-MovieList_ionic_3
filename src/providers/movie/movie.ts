import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class MoovieProvider {

  //private apikey = '?api_key=96f64791595f0c7f4511a3830c2539a3';
  //private baseUrl = 'https://api.themoviedb.org/3/';
  //private movie = 'movie/'
  // private sortByPopularity = '&sort_by=popularity.desc';
  //private jsonpCallback = '?callback=JSONP_CALLBACK';
  // private sharedSearchResult: Array<Object> = [];

  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: HttpClient) {
    console.log('Chamada para o webAPI');
  }

  getPopularMovies() {
    return this.http.get(this.baseApiPath + '/movie/popular?api_key=' + this.getApiKey());
    // return this.http.get(this.baseUrl + this.movie + 'popular' + this.apikey);
    // // .map(result => result.json())
  }

  getMoviesDetail(filmeid) {
    return this.http.get(this.baseApiPath + '/movie/' + filmeid + '?api_key=' + this.getApiKey());
  }

  getApiKey(): string {
    return "96f64791595f0c7f4511a3830c2539a3";
  }
}