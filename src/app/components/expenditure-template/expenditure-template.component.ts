import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CodesService, OptionValue } from 'src/app/services/codes.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AccountcodeSearchDialogComponent } from '../accountcode-search-dialog/accountcode-search-dialog.component';

@Component({
  selector: 'app-expenditure-template',
  templateUrl: './expenditure-template.component.html',
  styleUrls: ['./expenditure-template.component.css']
})
export class ExpenditureTemplateComponent implements OnInit {

  @Input() public currentItem: any = null;
  @ViewChild('accountCode') accountCodeInput: ElementRef;
  @ViewChild('amount') amountInput: ElementRef;
  faSearch = faSearch;

  constructor(
      private codesService: CodesService,
      private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  retrieveAccountCode(): void {
    this.codesService.getAccountCode(this.currentItem.accountCode.code)
      .subscribe(
        response => {
          console.log(response);
          this.currentItem.accountCode = response;
        },
        error => {
          console.log(error);
          this.currentItem.accountCode.item = 'Wrong account code!';
          this.currentItem.accountCode.committee = error.error.message;
          this.accountCodeInput.nativeElement.focus();
        });
  }
  
  searchAccount(): void {
    const searchDialog = this.dialog.open(AccountcodeSearchDialogComponent);

    searchDialog.afterClosed().subscribe(result => {
      if (result != '') {
        this.currentItem.accountCode.code = result;
        this.retrieveAccountCode();
        this.amountInput.nativeElement.focus();
      }
    });
  }    
}
