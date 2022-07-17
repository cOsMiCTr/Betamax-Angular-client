import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

/**
 * @class ProfileViewComponent
 * @implements {ngOnInit}
 * @description This component is used to display the user's profile.
 * @param {any} data
 * @memberof ProfileViewComponent
 */
export class ProfileViewComponent implements OnInit {
  user: any = {};

  /**
   * 
   * @param fetchApiData - inject the FetchApiDataService
   * @param dialog  - inject the MatDialog
   * @param router  - inject the Router
   * @param snackBar  - inject the MatSnackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * @description This method is used to get the user.
   * @memberof ProfileViewComponent
   * @returns {void}
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }
/**
 * @description This method is used to open the edit user profile dialog.
 * @memberof ProfileViewComponent
 * @returns {void}
 */
  openEditProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '300px'
    })
  }

  /**
   * @description This method is used to delete the user.
   * @memberof ProfileViewComponent
   * @returns {void}
   */
  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your account? This cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}