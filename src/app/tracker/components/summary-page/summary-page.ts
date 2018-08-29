
import {Component} from '@angular/core';
import {GridOptions} from 'ag-grid';



@Component({
  templateUrl: 'summary-page.html',
  styleUrls: ['summary-page.scss'],
})
export class SummaryPageComponent {

  gridApi;
  rowData = [];

  gridOptions = <GridOptions>  {
    columnDefs: [{
      headerName: 'test',
      field: 'test',
      width: 100
    }],
    suppressHorizontalScroll: true,
    headerHeight: 50,
    rowHeight: 50,
  }

  ;

    constructor() {
      this.rowData.push({test: 'hello'});
    }

    onGridReady(params) {
      this.gridApi = params.api;
    }

}
