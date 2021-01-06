import { Component, OnInit } from '@angular/core';
import { ExpenditureService } from 'src/app/services/expenditure.service';

@Component({
  selector: 'app-add-expenditure',
  templateUrl: './add-expenditure.component.html',
  styleUrls: ['./add-expenditure.component.css']
})
export class AddExpenditureComponent implements OnInit {

  currentItem = {
    requestDate: '',
    accountCode: {
      code: '',
      item: '---',
      committeeCode: '',
      committee: '---'
    },
    amount: '',
    requester: '',
    signature: '',
    treasurerInitial: '',
    chequeNo: '',
    payableTo: '',
    note: '',
    remarks: ''
  };
  submitted = false;

  constructor(private expenditureService: ExpenditureService) { }

  ngOnInit(): void {
  }

  save(): void {
    const data = {
      requestDate: this.currentItem.requestDate,
      accountCode: {
        code: this.currentItem.accountCode.code,
        item: this.currentItem.accountCode.item,
        committeeCode: this.currentItem.accountCode.committeeCode,
        committee: this.currentItem.accountCode.committee,
      },
      amount: this.currentItem.amount,
      requester: this.currentItem.requester,
      signature: this.currentItem.signature,
      treasurerInitial: this.currentItem.treasurerInitial,
      chequeNo: this.currentItem.chequeNo,
      payableTo: this.currentItem.payableTo,
      note: this.currentItem.note,
      remarks: this.currentItem.remarks
    };

    this.expenditureService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  new(): void {
    this.submitted = false;
    this.currentItem = {
      requestDate: '',
      accountCode: {
        code: '',
        item: '---',
        committeeCode: '',
        committee: '---'
      },
      amount: '',
      requester: '',
      signature: '',
      treasurerInitial: '',
      chequeNo: '',
      payableTo: '',
      note: '',
      remarks: ''
    };
  }

}
