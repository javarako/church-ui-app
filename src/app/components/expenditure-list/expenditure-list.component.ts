import { Component, OnInit } from '@angular/core';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { CodesService, OptionValue } from 'src/app/services/codes.service';

@Component({
  selector: 'app-expenditure-list',
  templateUrl: './expenditure-list.component.html',
  styleUrls: ['./expenditure-list.component.css']
})
export class ExpenditureListComponent implements OnInit {

  committeeCodes: OptionValue[];
  items: any;
  currentItem = null;
  currentIndex = -1;
  committee = '';
  beginDate = this.getJanuaryFirst();
  endDate = new Date();
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 100];

  constructor(
    private expenditureService: ExpenditureService,
    private codesService: CodesService
    ) { }

  ngOnInit(): void {
    this.codesService.get('COMMITTEE_CODE')
    .subscribe(
      response => {
        console.log(response);
        this.committeeCodes = response;
      },
      error => {
        console.log(error);
      });

      this.retrieve();
  }

  getRequestParams(committee, beginDate, endDate, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (committee) {
      params[`committee`] = committee;
    }

    if (beginDate) {
      params[`beginDate`] = beginDate;
    }

    if (endDate) {
      params[`endDate`] = endDate;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieve(): void {
    const params = this.getRequestParams(
      this.committee, this.beginDate, this.endDate, this.page, this.pageSize);

    this.expenditureService.getAll(params)
      .subscribe(
        response => {
          const { items, totalItems } = response;
          this.items = items;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieve();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieve();
  }

  setActiveItem(item, index): void {
    this.currentItem = item;
    this.currentIndex = index;
  }

  removeAll(): void {
    this.expenditureService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieve();
        },
        error => {
          console.log(error);
        });
  }

  getJanuaryFirst(): Date {
    let today: Date = new Date();
    return new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
  }

}
