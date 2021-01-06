import { Component, Input,  ViewChild, ElementRef, OnInit } from '@angular/core';
import { CodesService } from 'src/app/services/codes.service';

@Component({
  selector: 'app-expenditure-template',
  templateUrl: './expenditure-template.component.html',
  styleUrls: ['./expenditure-template.component.css']
})
export class ExpenditureTemplateComponent implements OnInit {

  @Input() public currentItem : any = null;
  @ViewChild('accountCode') accountCodeInput: ElementRef;

  constructor(private codesService: CodesService, ) { }

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
}
