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
  message = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  financialReportDownload(): void {
    this.message = '';

    this.reportParam = {
      type: 'financialReport',
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

  getJanuaryFirst(): Date {
    let today: Date = new Date();
    return new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
  }
}
