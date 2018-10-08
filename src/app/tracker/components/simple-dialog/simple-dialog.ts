
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';



@Component({
  templateUrl: 'simple-dialog.html',
  styleUrls: ['simple-dialog.scss'],
})
export class SimpleDialogComponent implements OnInit{

  title;
  message;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<SimpleDialogComponent>,) {
  }

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
  }

}
