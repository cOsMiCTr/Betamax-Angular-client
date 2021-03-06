import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

/**
 * @class UserLoginFormComponent
 * @implements {ngOnInit}
 * @description This component is used to login the user.
 * @param {any} data
 * @memberof UserLoginFormComponent
 */
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };


  /**
   * 
   * @param fetchApiData - inject the FetchApiDataService
   * @param dialogRef - inject the MatDialogRef
   * @param snackBar - inject the MatSnackBar
   * @param router - inject the Router
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

/**
 * @description This method is used to login the user.
 * @memberof UserLoginFormComponent
 * @returns {void}
 * @param {any} userData
 * @param {any} dialogRef
 * @param {any} snackBar
 * @param {any} router
 * @param {any} fetchApiData
 */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close(); // Close the modal on success
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);
      this.snackBar.open("You have successfully logged in!", 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}