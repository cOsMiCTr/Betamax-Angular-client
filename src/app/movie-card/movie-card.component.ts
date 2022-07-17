import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

/**
 * @class MovieCardComponent
 * @implements {ngOnInit}
 *  @description This component is used to display the movie's profile.
 * @param {any} movies
 * @param {any} favoriteMovies
 * @memberof MovieCardComponent
 * @constructor
 * 
 */
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

/** 
 * @description This method is used to get the movies.
 * @memberof MovieCardComponent
 * @returns {void}
*/
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * @description This method is used to get the favorite movies.
   * @memberof MovieCardComponent
   * @returns {void}
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      return this.favoriteMovies;
    });
  }

  /**
   * 
   * @param id The id of the movie
   * @returns {boolean} True if the movie is in the favorite movies list, false otherwise
   * @memberof MovieCardComponent
   */
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  /**
   * @description This method is used to open the genre view dialog.
   * @memberof MovieCardComponent
   * @param {string} name
   * @param {string} description
   * @returns {void}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

/**
 * @description This method is used to open the director view dialog.
 * @memberof MovieCardComponent
 * @param {string} name
 * @param {string} description
 * @returns {void}
 * 
 */
  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      width: '500px'
    });

  }


  /**
   * @description This method is used to open the synopsis view dialog.
   * @memberof MovieCardComponent
   * @param {string} name
   * @param {string} description
   * @returns {void}
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });

  }

  /**
   * @description This method is used to add a movie to the favorite movies list.
   * @memberof MovieCardComponent
   * @param {string} id
   * @returns {void}
   */
  addToFavoriteMovies(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

/**
 * @description This method is used to remove a movie from the favorite movies list.
 * @memberof MovieCardComponent
 * @param {string} id
 * @returns {void}
 */
  removeFromFavoriteMovies(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

}