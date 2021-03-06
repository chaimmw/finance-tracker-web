
import {Component} from '@angular/core';
import * as _ from 'lodash';
import {FeathersClientService} from '../../services/feathers-client.service';
import {AuthService} from '../../services/authService';
import {MatDialog} from '@angular/material';
import {SimpleDialogComponent} from '../simple-dialog/simple-dialog';
import {Router} from '@angular/router';
import {ErrorDialogService} from '../../services/error-dialog.service';
import * as moment from 'moment';

const defaultExpense = {
  userId: undefined,
  // month: undefined,
  // year: undefined,
  date: undefined,
  food: undefined,
  gas: undefined,
  household: undefined,
  home: undefined,
  mortgage: undefined,
  utilities: undefined,
  misc: undefined,
  clothing: undefined,
  tuition: undefined,
};

@Component({
  templateUrl: 'expense-page.html',
  styleUrls: ['expense-page.scss'],
})
export class ExpensePageComponent {

  date;

  expense = _.cloneDeep(defaultExpense);

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

    saveExpense() {
      this.expense.userId = this.authService.user._id;
      this.expense.date = moment(this.date).startOf('month');
      this.feathersClient.service('expenses').create(this.expense).then(response => {
        console.log('saved');
        this.clearFields();
        this.onSaveMessage();
      })
        .catch(error => {
          console.log(error);
          this.errorDialog.displayError(error.message);
        });

      // console.log(moment(this.date).startOf('month'));
    }

    clearFields() {
      this.expense = _.cloneDeep(defaultExpense);
    }

    onSaveMessage() {
      Promise.resolve().then(() => {
        const dialogRef = this.dialog.open(SimpleDialogComponent, {
          data: {
            title: 'Saved',
            message: 'Your expense has been saved',
          },
          panelClass: 'dialog-container'
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/tracker/dashboard']);
        });
      });
    }

}
