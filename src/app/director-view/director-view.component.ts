import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})

/**
 * @class DirectorViewComponent
 * @implements {ngOnInit}
 * @description This component is used to display the director's profile.
 * @param {any} data
 * @memberof DirectorViewComponent
 * @throws Error
 * @constructor
 */
export class DirectorViewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birthday: Date,
    }
  ) { }
/**
 * @description This method is used to initialize the component.
 */
  ngOnInit(): void {
  }

}