
import {Component} from '@angular/core';
import * as _ from 'lodash';
import {FeathersClientService} from '../../services/feathers-client.service';
import {AuthService} from '../../services/authService';

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
                private authService: AuthService,) {
    }

    saveIncome() {
      this.feathersClient.service('incomes').create(this.income).then(response => {
        console.log('saved');
      });
    }

}
