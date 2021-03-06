import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})

/**
 * @class EditUserProfileComponent
 * @implements {ngOnInit}
 * @description This component is used to edit the user's profile.
 * @param {any} data
 * @memberof EditUserProfileComponent
 * @throws Error
 */
export class EditUserProfileComponent implements OnInit {

  @Input() userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

/**
 * Update the user profile
 * @param userData
 * @param form
 * @param formData
 * @param formData.value
 * @param formData.value.Name
 * @param formData.value.Bio
 * @param formData.value.Birthday
 * @returns {Promise<void>}
 * @memberof EditUserProfileComponent
 * @throws Error
 */
  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000
      });
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Please login again with your new credentials', 'OK', {
          duration: 2000
        });
      }
    })
  }

}