import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://betamax-cosmictr.herokuapp.com/';

const token = localStorage.getItem('token');

const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})


/**
 * @class FetchApiDataService
 * @implements {OnInit}
 * @description This service is used to fetch data from the api.
 * @param {any} http - inject the HttpClient
 * @memberof FetchApiDataService
 */
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {

  }

  /**
   * @description This method is used to register a new user.
   * @param {any} userDetails - user details
   * @returns - observable of user details
   * @memberof FetchApiDataService
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }



/**
 * 
 * @param userDetails - user details
 * @returns - observable of user details
 * @memberof FetchApiDataService
 */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }
  

/**
 * @description This method is used to get all the movies from the api.
 * @returns - observable of all the movies
 * @memberof FetchApiDataService
 * 
 */
    getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  /**
   * @description This method is used to get single movie details from the api.
   * @param {any} title - movie title
   * @returns - observable of movie details
   * @memberof FetchApiDataService
   */
  getOneMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @description This method is used to get director details from the api.
   * @param {any} name - director name
   * @returns - observable of director details
   * @memberof FetchApiDataService
   */
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/director/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @description This method is used to get genre details from the api.
   * @param {any} name - genre name
   * @returns - observable of genre details
   * @memberof FetchApiDataService
   */
  getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/genre/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @description This method is used to get user details from the api.
   * @param {any} username - user name
   * @returns - observable of user details
   * @memberof FetchApiDataService
   * @catchError - handle error
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @description This method is used to get favourite movies from the api.
   * @returns - observable of favourite movies
   * @memberof FetchApiDataService
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
     * @description This method is used to add a movie to the favourite list.
     * @param {any} movieID - movie id
     * @returns - observable of favourite movies
     * @memberof FetchApiDataService
     * @catchError - handle error
   */
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @description This method is used to remove a movie from the favourite list.
   * @param {any} movieID - movie id
   * @returns - observable of favourite movies
   * @memberof FetchApiDataService
   * @catchError - handle error
   */
  removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @description This method is used to update user details.
   * @param {any} updateDetails - update user details
   * @returns - observable of user details
   * @memberof FetchApiDataService
   */
  editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @description This method is used to delete user.
   * @returns - observable of user details
   * @memberof FetchApiDataService
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

/**
 * 
 * @param error - error message
 * @returns 
 */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }



  /**
     * @description This method is used to extract the response data.
     * @param {any} res - response data
     * @returns - response data
     * @memberof FetchApiDataService
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


}

