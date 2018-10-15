
import {Component} from '@angular/core';
import * as _ from 'lodash';
import {FeathersClientService} from '../../services/feathers-client.service';
import {AuthService} from '../../services/authService';
import {SimpleDialogComponent} from '../simple-dialog/simple-dialog';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {ErrorDialogService} from '../../services/error-dialog.service';

const defaultIncome = {
  userId: undefined,
  month: undefined,
  year: undefined,
  earnings: undefined,
};

@Component({
  templateUrl: 'income-page.html',
  styleUrls: ['income-page.scss'],
})
export class IncomePageComponent {

  income = _.cloneDeep(defaultIncome);

  months = [{name: 'Jan', value: 1},
    {name: 'Feb', value: 2},
    {name: 'Mar', value: 3},
    {name: 'Apr', value: 4},
    {name: 'May', value: 5},
    {name: 'Jun', value: 6},
    {name: 'Jul', value: 7},
    {name: 'Aug', value: 8},
    {name: 'Sept', value: 9},
    {name: 'Oct', value: 10},
    {name: 'Nov', value: 11},
    {name: 'Dec', value: 12}];


    constructor(private feathersClient: FeathersClientService,
                private authService: AuthService,
                private dialog: MatDialog,
                private router: Router,
                private errorDialog: ErrorDialogService) {
    }

    saveIncome() {

      this.income.userId = this.authService.user._id;

      this.feathersClient.service('incomes').create(this.income).then(response => {
        console.log('saved');
        this.clearFields();
        this.onSaveMessage();
      })
        .catch(error => {
          console.log(error);
          this.errorDialog.displayError(error.message);
        });
    }

    clearFields() {
      this.income = _.cloneDeep(defaultIncome);
    }

  onSaveMessage() {
    Promise.resolve().then(() => {
      const dialogRef = this.dialog.open(SimpleDialogComponent, {
        data: {
          title: 'Saved',
          message: 'Your income has been saved',
        },
        panelClass: 'dialog-container'
      });

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/tracker/dashboard']);
      });
    });
  }

}
