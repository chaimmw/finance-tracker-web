
import {Component} from '@angular/core';
import * as _ from 'lodash';
import {FeathersClientService} from '../../services/feathers-client.service';
import {AuthService} from '../../services/authService';

const defaultExpense = {
  userId: undefined,
  month: undefined,
  year: undefined,
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
                private authService: AuthService) {
    }

    saveExpense(){
      this.expense.userId = this.authService.user._id;
      this.feathersClient.service('expenses').create(this.expense).then(response => {
        console.log('saved');
      });
    }

}
