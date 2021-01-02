import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetService } from 'src/app/services/budget.service';
import { CodesService } from 'src/app/services/codes.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface Budget {
  id: number;
  year: number;
  accountCode: {
    code: string;
    item: string;
    fundType: string;
    committee: string;
  };
  lastYearBudget: number;
  lastYearActual: number;
  budget: number;
}

@Component({
  selector: 'app-budget-assignment',
  templateUrl: './budget-assignment.component.html',
  styleUrls: ['./budget-assignment.component.css']
})
export class BudgetAssignmentComponent implements OnInit {

  @ViewChild('accountCode') accountCodeInput: ElementRef;
  @ViewChild('fileInput') fileInput: any;
  fileAttr = 'Choose CSV File';
  faEdit = faEdit;
  trashAlt = faTrashAlt;

  displayedColumns: string[] = ['code', 'description', 'lastYearBudget', 'lastYearActual', 'budget', 'edit', 'delete'];
  message = '';
  editable = false;
  uploadChecked = false;
  budgetYear = '';
  items: any;
  currentItem = {
    id: null,
    year: null,
    accountCode: {
      code: '',
      item: ''
    },
    lastYearBudget: null,
    lastYearActual: null,
    budget: null
  };

  currentIndex = -1;

  constructor(
    private budgetService: BudgetService,
    private codesService: CodesService, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  retrieve(): void {
    this.message = '';
    this.budgetService.get(this.budgetYear)
      .subscribe(
        response => {
          console.log(response);
          this.items = response;
          this.newItem();
        },
        error => {
          console.log(error);
        });
  }

  retrieveAccountCode(): void {
    this.message = '';
    this.codesService.getAccountCode(this.currentItem.accountCode.code)
      .subscribe(
        response => {
          console.log(response);
          this.currentItem.accountCode = response;
        },
        error => {
          console.log(error);
          this.message = error.error.message;
          this.accountCodeInput.nativeElement.focus();
        });
  }

  upload($event: any): void {

    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) { 
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let data = this.getDataRecordsArrayFromCSVFile(csvRecordsArray);
        this.saveAll(this.budgetYear, data);
        this.message = 'Uploaded successfully!'
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }

  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  

  fileReset() {  
    this.fileInput.nativeElement.value = "";
    this.items = [];  
  }  

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      //skip header
      let accountNo = curruntRecord[0].trim();
      console.log('accountNo:' + accountNo + ', ' + accountNo.replace(/-/g, ''));
      console.log('Is number' + !isNaN(Number(accountNo.replace(/-/g, ''))) );

      if (accountNo && !isNaN(Number(accountNo.replace(/-/g, '')))) {
        const data = {
          id: null,
          year: this.budgetYear,
          accountCode: {
            code: curruntRecord[0].trim(),
            item: curruntRecord[1].trim()
          },
          lastYearBudget: curruntRecord[2].trim(),
          lastYearActual: curruntRecord[3].trim(),
          budget: curruntRecord[4].trim()
        };
        csvArr.push(data);
      }
    }
    return csvArr;
  }

  saveAll(year, data): void {
    this.message = '';
    this.budgetService.upload(year, data)
      .subscribe(
        response => {
          console.log(response);
          this.items = response;
          this.newItem();
          this.editable = false;
          this.accountCodeInput.nativeElement.focus();
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  save(): void {
    const data = {
      id: this.currentItem.id,
      year: this.budgetYear,
      accountCode: {
        code: this.currentItem.accountCode.code,
        item: this.currentItem.accountCode.item
      },
      lastYearBudget: this.currentItem.lastYearBudget,
      lastYearActual: this.currentItem.lastYearActual,
      budget: this.currentItem.budget
    };

    this.message = '';
    this.budgetService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.items.unshift(response);
          this.items = [...this.items];
          this.newItem();
          this.editable = false;
          this.accountCodeInput.nativeElement.focus();
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  newItem(): void {
    this.currentItem = {
      id: null,
      year: null,
      accountCode: {
        code: '',
        item: ''
      },
      lastYearBudget: null,
      lastYearActual: null,
      budget: null
    };
    this.editable = false;
  }

  edit(item): void {
    this.currentItem = item;
    this.editable = true;
    this.message = '';
  }

  update(): void {
    this.budgetService.update(this.currentItem.id, this.currentItem)
      .subscribe(
        response => {
          console.log(response);
          this.editable = false;
          this.message = 'Updated successfully!';
          this.newItem();
          this.accountCodeInput.nativeElement.focus();
        },
        error => {
          console.log(error);
        });
  }

  delete(id): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove the item',
        message: 'Are you sure, you want to remove it?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {

        this.budgetService.delete(id)
          .subscribe(
            response => {
              console.log(response);
              this.items = this.items.filter((value, key) => {
                return value.id != id;
              });
              this.accountCodeInput.nativeElement.focus();
            },
            error => {
              console.log(error);
            });
      }
    });
  }
}
