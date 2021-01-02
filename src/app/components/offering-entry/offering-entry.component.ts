import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OfferingService } from 'src/app/services/offering.service';
import { CodesService } from 'src/app/services/codes.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface OptionValue {
  id: number;
  type: string;
  value: string;
  viewValue: string;
}

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
    amount: ''
  };

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
  }

  saveOffering(): void {
    const data = {
      offeringSunday: this.currentOffering.offeringSunday,
      offeringDate: this.currentOffering.offeringDate,
      offeringNumber: this.currentOffering.offeringNumber,
      offeringType: this.currentOffering.offeringType,
      amountType: this.currentOffering.amountType,
      amount: this.currentOffering.amount
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
      amount: ''
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
}
