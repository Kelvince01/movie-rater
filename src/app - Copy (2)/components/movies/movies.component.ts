import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';
import { MoviesCsvService } from 'src/app/service/movies-csv.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  topRated: any;
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  searchStr: string;
  searchStrDirector: string;
  searchStrCast: string;
  searchStrYear: string;

  public movies: Movie[] = [];
  totalMovies: any;
  total_movies: any;

  constructor(private movieService: MoviesService,
    private csvMovieService: MoviesCsvService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit() {
    this.getTopRatedMovies(1);
    this.csvMovieService.getMovies(1).subscribe((movies) => (this.movies = movies));
    //this.csvMovieService.getMovies(1);
  }

  getTopRatedMovies(page: number) {
    this.movieService.getTopRatedMovies(page).pipe(delay(2000)).subscribe((res: any) => {
      this.topRated = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    },
    error => console.log(error));
  }

  getMovies(page: number) {
    this.csvMovieService.getMovies(page).pipe(delay(2000)).subscribe((res: any) => {
      this.movies = res;
      this.loader = false;
    },
    error => console.log(error));
  }

  changePage(event) {
    this.loader = true;
    //this.getTopRatedMovies(event.pageIndex + 1);
    this.getMovies(event.pageIndex + 1);
  }

  searchMovies() {
    this.movieService.searchMovies(this.searchStr).subscribe(res => {
      this.searchRes = res.results;
    });
  }

  //search_Movies() {
    //this.csvMovieService.search_Movies(this.searchStr, this.searchStrDirector, this.searchStrYear, //this.searchStrCast).subscribe(res => {
    //  this.searchRes = res;
   // });
  //}

  search_Movies() {
    this.searchRes = this.searchStr === ""? this.movies : this.movies.filter((element) => {
      return element.original_title.toLowerCase() == this.searchStr.toLowerCase();
    });
  }


}

/*
// 👇️ const date: Date
const date = new Date('2023-09-24');

// 👇️ const currentYear: number
const currentYear = date.getFullYear();
console.log(currentYear); // 👉️ 2023
*/
