import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OfferingService } from 'src/app/services/offering.service';
import { CodesService, OptionValue } from 'src/app/services/codes.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import * as fileSaver from 'file-saver';

interface AmountSummary {
  type: string;
  total: number;
}

@Component({
  selector: 'app-offering-entry',
  templateUrl: './offering-entry.component.html',
  styleUrls: ['./offering-entry.component.css']
})
export class OfferingEntryComponent implements OnInit {

  @ViewChild('offeringNumber') offeringNumberInput: ElementRef;
  faEdit = faEdit;
  trashAlt = faTrashAlt;

  sundayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Only able to select Sunday.
    return day == 0;
  }

  offeringTypes: OptionValue[];
  amountTypes: OptionValue[];
  amountSummary: AmountSummary[];

  displayedColumns: string[] = ['offeringDate', 'offeringNumber', 'offeringType', 'amountType', 'amount', 'edit', 'delete'];
  displayedTotalColumns: string[] = ['type', 'total'];
  message = '';
  editable = false;
  totalAmount = 0;
  offerings: any;
  currentOffering = {
    id: null,
    offeringSunday: this.getSundayFromToday(),
    offeringDate: new Date(),
    offeringNumber: '',
    offeringType: '',
    amountType: '',
    amount: '',
    memo: ''
  };

  deposit = {
    offeringSunday: null,
    depositTotal: 0,
    chequeTotal: 0,
    usChequeTotal: 0,
    cashTotal: 0,
    usCashTotal: 0,
    bill100: 0,
    bill100Total: 0,
    bill050: 0,
    bill050Total: 0,
    bill020: 0,
    bill020Total: 0,
    bill010: 0,
    bill010Total: 0,    
    bill005: 0,
    bill005Total: 0,
    coinIn: 0,
    coinOut: 0
  }

  depositMatch: boolean;
  currentIndex = -1;

  constructor(
    private offeringService: OfferingService,
    private codesService: CodesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveOfferings();

    this.codesService.get('OFFERING_TYPE')
      .subscribe(
        response => {
          console.log(response);
          this.offeringTypes = response;
        },
        error => {
          console.log(error);
        });

    this.codesService.get('AMOUNT_TYPE')
      .subscribe(
        response => {
          console.log(response);
          this.amountTypes = response;
        },
        error => {
          console.log(error);
        });
  }

  getRequestParams(offeringSunday): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (offeringSunday) {
      params[`offeringSunday`] = offeringSunday;
    }

    return params;
  }

  retrieveOfferings(): void {
    const params = this.getRequestParams(this.currentOffering.offeringSunday);

    this.message = '';
    this.offeringService.getAll(params)
      .subscribe(
        response => {
          console.log(response);
          const { offerings } = response;
          this.offerings = offerings;
          this.getTotalAmount();
          this.newOffering();
        },
        error => {
          console.log(error);
        });


    this.offeringService.getDepositDetai(this.currentOffering.offeringSunday)
      .subscribe(
        response => {
          console.log(response);
          this.deposit = response;
          this.updateDepositAmount();
        },
        error => {
          this.deposit = {
            offeringSunday: this.deposit.offeringSunday,
            depositTotal: this.deposit.depositTotal,
            chequeTotal: this.deposit.chequeTotal,
            usChequeTotal: this.deposit.usChequeTotal,
            cashTotal: 0,
            usCashTotal: 0,
            bill100: 0,
            bill100Total: 0,
            bill050: 0,
            bill050Total: 0,
            bill020: 0,
            bill020Total: 0,
            bill010: 0,
            bill010Total: 0,    
            bill005: 0,
            bill005Total: 0,
            coinIn: 0,
            coinOut: 0
          }
          console.log(error);
        });

  }

  saveOffering(): void {
    const data = {
      offeringSunday: this.currentOffering.offeringSunday,
      offeringDate: this.currentOffering.offeringDate,
      offeringNumber: this.currentOffering.offeringNumber,
      offeringType: this.currentOffering.offeringType,
      amountType: this.currentOffering.amountType,
      amount: this.currentOffering.amount,
      memo: this.currentOffering.memo
    };

    this.message = '';
    this.offeringService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.offerings.unshift(response);
          this.offerings = [...this.offerings];
          this.getTotalAmount();
          this.updateDepositAmount();
          this.newOffering();
          this.editable = false;
          this.offeringNumberInput.nativeElement.focus();
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  newOffering(): void {
    this.currentOffering = {
      id: null,
      offeringSunday: this.currentOffering.offeringSunday,
      offeringDate: this.currentOffering.offeringDate,
      offeringNumber: '',
      offeringType: '',
      amountType: '',
      amount: '',
      memo: ''
    };
    this.editable = false;
  }

  editOffering(offering): void {
    this.currentOffering = offering;
    this.editable = true;
    this.message = '';
  }

  updateOffering(): void {
    this.offeringService.update(this.currentOffering.id, this.currentOffering)
      .subscribe(
        response => {
          console.log(response);
          this.editable = false;
          this.message = 'The offering was updated successfully!';
          this.getTotalAmount();
          this.newOffering();
          this.offeringNumberInput.nativeElement.focus();
        },
        error => {
          console.log(error);
        });
  }

  deleteOffering(id, type, amount): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Offering',
        message: 'Are you sure, you want to remove an Offering?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {

        this.offeringService.delete(id)
          .subscribe(
            response => {
              console.log(response);
              this.offerings = this.offerings.filter((value, key) => {
                return value.id != id;
              });
              this.getTotalAmount();
              this.offeringNumberInput.nativeElement.focus();
            },
            error => {
              console.log(error);
            });

      }
    });
  }

  getTotalAmount(): void {
    this.amountSummary = [];
    this.totalAmount = 0;
    //calculate all
    if (this.offerings && this.offerings.length > 0) {
      for (var offering of this.offerings) {
        let item = this.amountSummary.find(i => i.type === offering.amountType);
        if (item != null) {
          item.total = item.total + offering.amount;
        } else {
          item = {
            type: offering.amountType,
            total: offering.amount
          }
          this.amountSummary.push(item);
        }

        this.totalAmount = this.totalAmount + offering.amount;
      }
    }

    this.amountSummary = [...this.amountSummary];
    this.updateDepositAmount();
  }

  getSundayFromToday(): Date {
    let today: Date = new Date();
    const day = today.getDay();
    // Only able to select Sunday.
    if (day != 0) {
      today = new Date(today.getTime() + (1000 * 60 * 60 * 24) * (7 - day));
    }
    today.setHours(0, 0, 0, 0);
    return today;
}

  updateDepositAmount(): void {

    let cashItem = null;
    let chequeItem = null;
    let usCashItem = null;
    let usChequeItem = null;

    if (this.amountSummary && this.amountSummary.length > 0) {
      cashItem = this.amountSummary.find(i => i.type === 'Cash');
      chequeItem = this.amountSummary.find(i => i.type === 'Cheque');
      usCashItem = this.amountSummary.find(i => i.type === 'USCash');
      usChequeItem = this.amountSummary.find(i => i.type === 'USCheque');
    }

    let bill100Total = this.deposit.bill100 * 100;
    let bill050Total = this.deposit.bill050 * 50;
    let bill020Total = this.deposit.bill020 * 20;
    let bill010Total = this.deposit.bill010 * 10;
    let bill005Total = this.deposit.bill005 * 5;

    let cashTotal = bill100Total + bill050Total + bill020Total + bill010Total + bill005Total;

    let depositTotal = cashTotal;
    if (chequeItem != null) {
      depositTotal = depositTotal + chequeItem.total;
    }
    if (usChequeItem != null) {
      depositTotal = depositTotal + usChequeItem.total;
    }
    if (usCashItem != null) {
      depositTotal = depositTotal + usCashItem.total;
    }

    if (cashTotal === ((cashItem == null ? 0:cashItem.total) + this.deposit.coinIn - this.deposit.coinOut)) {
      console.log('Deposit amount match!');
      this.depositMatch = true;
    } else {
      console.log('Deposit amount NOT match!');
      this.depositMatch = false;
    }

    this.deposit = {
      offeringSunday: this.currentOffering.offeringSunday,
      depositTotal: depositTotal,
      chequeTotal: chequeItem == null ? 0:chequeItem.total,
      usChequeTotal: usChequeItem == null ? 0:usChequeItem.total,
      cashTotal: cashTotal,
      usCashTotal: usCashItem == null ? 0:usCashItem.total,
      bill100: this.deposit.bill100,
      bill100Total: bill100Total,
      bill050: this.deposit.bill050,
      bill050Total: bill050Total,
      bill020: this.deposit.bill020,
      bill020Total: bill020Total,
      bill010: this.deposit.bill010,
      bill010Total: bill010Total,
      bill005: this.deposit.bill005,
      bill005Total: bill005Total,
      coinIn: this.deposit.coinIn,
      coinOut: this.deposit.coinOut
    }
  }

  saveAndPrintDeposit(): void {
    this.message = '';
    this.offeringService.saveDepositDetail(this.deposit)
      .subscribe(
        file => {
          //console.log(response);
          const blob = new Blob([file], { type: 'pdf' }); // you can change the type
          fileSaver.saveAs(blob, 'WeeklyOfferingReport' + (new Date().getTime()) + '.pdf');
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

}
