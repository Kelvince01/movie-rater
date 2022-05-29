import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesCsvService {

    public movies: Movie[] = [];
  private _jsonURL = 'assets/tmdb-movies.json';

  constructor(private http: HttpClient) {
    this.get_Movies().subscribe(data => {
      console.log(data);
      this.movies = data;
     });
  }

  getMovies(page: number): Observable<any> {
    return this.http.get(this._jsonURL);
    /*return this.http.get('app/data/tmdb-movies.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.movies.push(new Movie( parseInt( row[0], 10), row[3], row[4].trim()));
            }
            console.log(this.movies);
        },
        error => {
            console.log(error);
        }
    );*/
  }

  get_Movies(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  search_Movies(searchStr: string, director: string, year: string, cast: string) {
    /*return this.movies.filter(movie => {
      return movie['original_title'] == searchStr;
    });*/

    /*return this.movies.filter((m) => m.genres.split("|") === searchStr &&
      m.director.split("|") === director && new Date(m.release_year).getFullYear() === year &&
      m.cast.split("|") === cast);*/

      /*return this.movies.map((m) => m.genres === searchStr &&
      m.director === director && new Date(m.release_year).getFullYear() === year &&
      m.cast === cast);*/

      return this.movies.filter(movie => {
        movie['original_title'] == searchStr;
      });
  }

  getMovie(id: String) {
    return movies => movies.filter(movie => movie.id === id);
  }
}
