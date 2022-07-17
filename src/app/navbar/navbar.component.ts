import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/**
 * @class NavbarComponent
 * @implements {OnInit}
 * @description This component is used to display the navbar.
 * @param {any} router
 * @memberof NavbarComponent
 * @constructor
 */
export class NavbarComponent implements OnInit {

 
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

/**
 * @description This method is used to go to the movies.
 * @memberof NavbarComponent
 * @returns {void}
 */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * @description This method is used to go to user's profile.
   * @memberof NavbarComponent
   * @returns {void}
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @description This method is used to logout.
   * @memberof NavbarComponent
   * @returns {void}
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }


}