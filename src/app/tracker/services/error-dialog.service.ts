import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SimpleDialogComponent} from '../components/simple-dialog/simple-dialog';


@Injectable()
export class ErrorDialogService {

  constructor(private matDialog: MatDialog) {

  }

  displayError(message) {
    Promise.resolve().then(() => {
      const dialogRef = this.matDialog.open(SimpleDialogComponent, {
        data: {
          title: 'Error',
          message: message
        },
        panelClass: 'error-dialog-container'
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('dialog closed');
      });
    });
  }


}

