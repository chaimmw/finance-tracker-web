import {Component, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {FeathersClientService} from '../../services/feathers-client.service';
import {AuthService} from '../../services/authService';
import * as _ from 'lodash';
import * as moment from 'moment';


@Component({
  templateUrl: 'summary-page.html',
  styleUrls: ['summary-page.scss'],
})
export class SummaryPageComponent implements OnInit {

  gridApi;
  rowData = [];
  expenses = [];
  incomes = [];

  gridOptions = <GridOptions>  {
    columnDefs: [{
      headerName: 'date',
      valueGetter: params => {
        return moment(params.data.date).format('MMM') + ' ' + moment(params.data.date).format('YYYY');
      },
      sort: 'asc',
      comparator: function (valueA, valueB, nodeA, nodeB, isInverted) {
          // get date info from nodes
          const rowADate = nodeA.data.year;
          const rowBDate = nodeB.data.year;
         if (moment(rowADate).isAfter(rowBDate)) {
            return 1;
          }  else {
            return -1;
          }
      },
      width: 150
    },
      // {
      //   headerName: 'month',
      //   valueGetter: params => {
      //     switch (params.data.month) {

      //       case 1:
      //         return 'Jan';
      //         break;
      //       case 2:
      //         return 'Feb';
      //         break;
      //       case 3:
      //         return 'Mar';
      //         break;
      //       case 4:
      //         return 'Apr';
      //         break;
      //       case 5:
      //         return 'May';
      //         break;
      //       case 6:
      //         return 'Jun';
      //         break;
      //       case 7:
      //         return 'Jul';
      //         break;
      //       case 8:
      //         return 'Aug';
      //         break;
      //       case 9:
      //         return 'Sept';
      //         break;
      //       case 10:
      //         return 'Oct';
      //         break;
      //       case 11:
      //         return 'Nov';
      //         break;
      //       case 12:
      //         return 'Dec';
      //         break;

      //       default:
      //         return '';
      //     }
      //   },
      //   sort: 'asc',
      //   comparator: function (valueA, valueB, nodeA, nodeB, isInverted) {
      //     // get date info from nodes
      //     const rowADate = nodeA.data.year;
      //     const rowBDate = nodeB.data.year;
      //     // const rowAMonth = nodeA.data.month;
      //     // const rowBMonth = nodeB.data.month;
      //    if (moment(rowADate).isAfter(rowBDate)) {
      //       return 1;
      //     }  else {
      //       return -1;
      //     }
      //   },
      //   width: 100,
      // },
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
        width: 150,
      },
    ],
    enableSorting: true,
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
    console.log(this.authService.user._id);

    this.feathersClient.service('expenses').find({
      query: {
      userId: this.authService.user._id
    }}).then(response => {
      this.expenses = response.data;

      this.feathersClient.service('incomes').find({
        query: {
          userId: this.authService.user._id
        }}).then(responses => {
        this.incomes = responses.data;
      }).then(() => {
        this.combineIncomeExpenseData();
      });
    });


  }

  combineIncomeExpenseData() {

    this.rowData = this.expenses.map(expense => {

      const income = this.incomes.filter(earnings => earnings.date === expense.date);

      expense.totalExpense = this.getTotalExpense(expense);

      return income.length === 1 ? _.merge(expense, income[0]) : expense;
    });

  }

  getTotalExpense(expense) {
    // filter out non expense data e.g. created date, id
    const data = _.omit(_.pickBy(expense, _.isNumber), ['date', 'earnings']);
    return _.sum(_.values(data));
  }

}
