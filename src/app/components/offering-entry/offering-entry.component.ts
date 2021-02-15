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
  originalAmount = 0;
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
    cashTotal: 0,
    bill100: 0,
    bill100Total: 0,
    bill050: 0,
    bill050Total: 0,
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

    this.amountSummary = [];
    this.message = '';
    this.offeringService.getAll(params)
      .subscribe(
        response => {
          console.log(response);
          const { offerings } = response;
          this.offerings = offerings;
          for (let entry of offerings) {
            this.amountAdd(entry);
          }
          this.totalAmount = this.getTotalAmount();
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
          this.amountAdd(response);
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
    this.originalAmount = offering.amount;
    this.editable = true;
    this.message = '';
  }

  updateOffering(): void {
    this.offeringService.update(this.currentOffering.id, this.currentOffering)
      .subscribe(
        response => {
          console.log(response);
          this.amountUpdate(response);
          this.editable = false;
          this.originalAmount = 0;
          this.message = 'The offering was updated successfully!';
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
              this.amountDelete(type, amount);
              this.offerings = this.offerings.filter((value, key) => {
                return value.id != id;
              });
              this.offeringNumberInput.nativeElement.focus();
            },
            error => {
              console.log(error);
            });

      }
    });
  }

  amountAdd(offering): void {
    let item = null;

    if (this.amountSummary && this.amountSummary.length > 0) {
      item = this.amountSummary.find(i => i.type === offering.amountType);
    }

    if (item == null) {
      item = {
        type: offering.amountType,
        total: offering.amount
      }
      this.amountSummary.push(item);
    } else {
      item.total = item.total + offering.amount;
    }

    this.totalAmount = this.getTotalAmount();
    this.amountSummary = [...this.amountSummary];
  }

  amountUpdate(offering): void {
    let item = this.amountSummary.find(i => i.type === offering.amountType);
    if (item != null) {
      item.total = item.total + offering.amount;
      item.total = item.total - this.originalAmount;
    }

    this.totalAmount = this.getTotalAmount();
    this.amountSummary = [...this.amountSummary];
  }

  amountDelete(type, amount): void {
    let item = this.amountSummary.find(i => i.type === type);
    if (item != null) {
      item.total = item.total - amount;
    }

    this.totalAmount = this.getTotalAmount();
    this.amountSummary = [...this.amountSummary];
  }

  getTotalAmount(): number {
    let amount = 0;
    this.amountSummary.forEach(function (value) {
      amount = amount + value.total;
    });

    this.updateDepositAmount();
    return amount;
  }

  getSundayFromToday(): Date {
    let today: Date = new Date();
    const day = today.getDay();
    // Only able to select Sunday.
    if (day == 0) {
      return today;
    } else {
      return new Date(today.getTime() + (1000 * 60 * 60 * 24) * (7 - day));
    }
  }

  updateDepositAmount(): void {

    let cashItem = null;
    let chequeItem = null;

    if (this.amountSummary && this.amountSummary.length > 0) {
      cashItem = this.amountSummary.find(i => i.type === 'Cash');
      chequeItem = this.amountSummary.find(i => i.type === 'Cheque');
    }

    if (cashItem == null) {
      cashItem = {
        type: 'Cash',
        total: 0
      }
    }

    if (chequeItem == null) {
      chequeItem = {
        type: 'Cheque',
        total: 0
      }
    }

    let bill100Total = this.deposit.bill100 * 100;
    let bill050Total = this.deposit.bill050 * 50;
    let bill010Total = this.deposit.bill010 * 10;
    let bill005Total = this.deposit.bill005 * 5;

    let cashTotal = bill100Total + bill050Total + bill010Total + bill005Total;

    let depositTotal = cashTotal + chequeItem.total;

    if (cashTotal === (cashItem.total + this.deposit.coinIn - this.deposit.coinOut)) {
      console.log('Deposit amount match!');
      this.depositMatch = true;
    } else {
      console.log('Deposit amount NOT match!');
      this.depositMatch = false;
    }

    this.deposit = {
      offeringSunday: this.currentOffering.offeringSunday,
      depositTotal: depositTotal,
      chequeTotal: chequeItem.total,
      cashTotal: cashTotal,
      bill100: this.deposit.bill100,
      bill100Total: bill100Total,
      bill050: this.deposit.bill050,
      bill050Total: bill050Total,
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
