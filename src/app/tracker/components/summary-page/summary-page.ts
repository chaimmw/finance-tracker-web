import {Component, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {FeathersClientService} from '../../services/feathers-client.service';
import {AuthService} from '../../services/authService';
import * as _ from 'lodash';


@Component({
  templateUrl: 'summary-page.html',
  styleUrls: ['summary-page.scss'],
})
export class SummaryPageComponent implements OnInit {

  gridApi;
  rowData = [];
  expenses = [];
  incomes = [];

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

  gridOptions = <GridOptions>  {
    columnDefs: [{
      headerName: 'year',
      field: 'year',
      width: 100
    },
      {
        headerName: 'month',
        valueGetter: params => {
          switch (params.data.month) {

            case 1:
              return 'Jan';
              break;
            case 2:
              return 'Feb';
              break;
            case 3:
              return 'Mar';
              break;
            case 4:
              return 'Apr';
              break;
            case 5:
              return 'May';
              break;
            case 6:
              return 'Jun';
              break;
            case 7:
              return 'Jul';
              break;
            case 8:
              return 'Aug';
              break;
            case 9:
              return 'Sept';
              break;
            case 10:
              return 'Oct';
              break;
            case 11:
              return 'Nov';
              break;
            case 12:
              return 'Dec';
              break;

            default:
              return '';
          }
        },
        width: 100,
      },
      {
        headerName: 'Expenses',
        field: 'totalExpense',
        width: 100,
      },
      {
        headerName: 'Incomes',
        field: 'earnings',
        width: 100,
      },
      {
        headerName: 'Monthly Total',
        valueGetter: params => {
          return params.data.earnings - params.data.totalExpense;
        },
        width: 100,
      },
    ],
    suppressHorizontalScroll: true,
    headerHeight: 50,
    rowHeight: 50,
  }

  ;

  constructor(private feathersClient: FeathersClientService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getUserFinanceRecords();
  }

  onGridReady(params) {
    this.gridApi = params.api;

    this.getUserFinanceRecords();

  }

  getUserFinanceRecords() {

    this.feathersClient.service('expenses').find({
      userId: this.authService.user._id
    }).then(response => {
      this.expenses = response.data;

      this.feathersClient.service('incomes').find({
        userId: this.authService.user._id
      }).then(responses => {
        this.incomes = responses.data;

      }).then(() => {
        this.combineIncomeExpenseData();
      });
    });


  }

  combineIncomeExpenseData() {

    this.rowData = this.expenses.map(expense => {

      console.log(this.incomes, expense);

      const income = this.incomes.filter(earnings => earnings.year === expense.year && earnings.month === expense.month);

      expense.totalExpense = this.getTotalExpense(expense);

      return income.length === 1 ? _.merge(expense, income[0]) : expense;
    });

  }

  getTotalExpense(expense) {
    // filter out non expense data e.g. created date, id
    const data = _.omit(_.pickBy(expense, _.isNumber), ['year', 'month', 'earnings']);
    return _.sum(_.values(data));
  }

  getMonthName(month) {
    switch (month) {

      case 1:
        return 'Jan';
        break;
      case 2:
        return 'Feb';
        break;
      case 3:
        return 'Mar';
        break;
      case 4:
        return 'Apr';
        break;
      case 5:
        return 'May';
        break;
      case 6:
        return 'Jun';
        break;
      case 7:
        return 'Jul';
        break;
      case 8:
        return 'Aug';
        break;
      case 9:
        return 'Sept';
        break;
      case 10:
        return 'Oct';
        break;
      case 11:
        return 'Nov';
        break;
      case 12:
        return 'Dec';
        break;

      default:
        return '';

    }
  }
}
