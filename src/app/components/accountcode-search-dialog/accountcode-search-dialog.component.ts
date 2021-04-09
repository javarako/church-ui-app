import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CodesService, OptionValue } from 'src/app/services/codes.service';

@Component({
  selector: 'app-accountcode-search-dialog',
  templateUrl: './accountcode-search-dialog.component.html',
  styleUrls: ['./accountcode-search-dialog.component.css']
})

export class AccountcodeSearchDialogComponent implements OnInit {

  committeeCodes: OptionValue[];
  accountList: any;
  currentAccount = {code:''};
  currentIndex = -1;

  constructor(private codesService: CodesService, 
      public dialogRef: MatDialogRef<AccountcodeSearchDialogComponent>) { }

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
  }

  getAccountList(committee): void {
    this.codesService.getAccountCodesByCommittee(committee)
    .subscribe(
      response => {
        console.log(response);
        this.accountList = response;
        this.currentAccount = {code:''};
        this.currentIndex = -1;
      },
      error => {
        console.log(error);
      });    
  }

  setSelection(account, index): void {
    this.currentAccount = account;
    this.currentIndex = index;
  }

}
