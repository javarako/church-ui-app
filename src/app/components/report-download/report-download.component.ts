import { Component, OnInit } from '@angular/core';
import { ReportService, ReportParam } from 'src/app/services/report.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-report-download',
  templateUrl: './report-download.component.html',
  styleUrls: ['./report-download.component.css']
})

export class ReportDownloadComponent implements OnInit {

  reportParam: ReportParam;
  beginDate = this.getJanuaryFirst();
  endDate = new Date();
  allMemberOff: boolean;
  offeringNoOff = '';
  allMember: boolean;
  offeringNo = '';
  message = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  financialReportDownload(): void {
    this.message = '';

    this.reportParam = {
      type: 'FinancialReport',
      fromDate: this.beginDate,
      toDate: this.endDate
     }

    this.reportService.financialReport(this.reportParam)
      .subscribe(
        file => {
          //console.log(response); Financial_Report_2021.xlsx
          const blob = new Blob([file], { type: 'xlsx' }); // you can change the type
          fileSaver.saveAs(blob, 'Financial_Report_2021_' + (new Date().getTime()) + '.xlsx');
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  offeringReportDownload(): void {
    this.message = '';

    this.reportParam = {
      type: 'OfferingReport',
      fromDate: this.beginDate,
      toDate: this.endDate,
      allMember: this.allMemberOff,
      offeringNo: this.offeringNoOff
    }

    this.reportService.offeringReport(this.reportParam)
      .subscribe(
        file => {
          //console.log(response); Financial_Report_2021.xlsx
          const blob = new Blob([file], { type: 'csv' }); // you can change the type
          fileSaver.saveAs(blob, 'Offering_Report_' + (new Date().getTime()) + '.csv');
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  taxReceiptDownload(): void {
    this.message = '';

    this.reportParam = {
      type: 'TaxReceipt',
      fromDate: this.beginDate,
      toDate: this.endDate,
      allMember: this.allMember,
      offeringNo: this.offeringNo
    }

    this.reportService.offeringTaxReceipt(this.reportParam)
    .subscribe(
      file => {
        //console.log(response);
        const blob = new Blob([file], { type: 'pdf' }); // you can change the type
        fileSaver.saveAs(blob, 'OfferingTaxReceipt_' + (new Date().getTime()) + '.pdf');
      },
      error => {
        console.log(error);
        this.message = error.error.message;
      });
  }

  expenditureReportDownload(reportType): void {
    this.message = '';

    this.reportParam = {
      type: reportType,
      fromDate: this.beginDate,
      toDate: this.endDate
    }

    this.reportService.expenditureReport(this.reportParam)
      .subscribe(
        file => {
          //console.log(response); Financial_Report_2021.xlsx
          const blob = new Blob([file], { type: 'csv' }); // you can change the type
          fileSaver.saveAs(blob, 'Expenditure_Report_' + (new Date().getTime()) + '.csv');
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  getJanuaryFirst(): Date {
    let today: Date = new Date();
    return new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
  }
}
