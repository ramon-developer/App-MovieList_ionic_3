import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  Provider é utilizado para fazer requisicoes dentro do App
*/
@Injectable()
export class MoovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: HttpClient) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMovies() {
    this.http.get(this.baseApiPath + "/movie/latest?api_key=" + this.getApiKey());
  }

  getApiKey(): string {
    "96f64791595f0c7f4511a3830c2539a3"
  }
}
