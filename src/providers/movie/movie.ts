import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Jsonp } from '@angular/http';
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
    console.log('Chamada para o webAPI');
  }

  getLatestMovies() {
    return this.http.get(this.baseApiPath + '/movie/popular?api_key=' + this.getApiKey());
  }

  getApiKey(): string {
    return "96f64791595f0c7f4511a3830c2539a3";
  }
}