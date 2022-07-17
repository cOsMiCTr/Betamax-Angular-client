import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})

/**
 * @class SynopsisViewComponent
 * @implements {ngOnInit}
 * @description This component is used to display the synopsis.
 * @param {any} data
 * @memberof SynopsisViewComponent
 * @constructor
 */
export class SynopsisViewComponent implements OnInit {

  /**
   * 
   * @param data - data to be displayed in the dialog
   * @memberof SynopsisViewComponent
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}