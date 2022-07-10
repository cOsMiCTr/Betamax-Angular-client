import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(
    public dialog: MatDialog
  ) { }

  // This is the function responsible for opening the user login form
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {

      width: '280px'
    });
  }

  // This is the function responsible for opening the user login form
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assign dialog width
      width: '280px'
    });
  }
}