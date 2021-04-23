import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-offeringnumber-search-dialog',
  templateUrl: './offeringnumber-search-dialog.component.html',
  styleUrls: ['./offeringnumber-search-dialog.component.css']
})
export class OfferingnumberSearchDialogComponent implements OnInit {

  members: any;
  currentMember = { offeringNumber: '' };
  currentIndex = -1;
  name = '';
  page = 1;
  count = 0;
  pageSize = 10;

  constructor(
    private memberService: MemberService,
    public dialogRef: MatDialogRef<OfferingnumberSearchDialogComponent>) { }

  ngOnInit(): void {
    this.members = [];
    this.count = 0;
  }

  getRequestParams(searchName, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveMembers(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.memberService.getAll(params)
      .subscribe(
        response => {
          const { members, totalItems } = response;
          this.members = members;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveMembers();
  }

  setSelection(member, index): void {
    this.currentMember = member;
    this.currentIndex = index;
  }

}
