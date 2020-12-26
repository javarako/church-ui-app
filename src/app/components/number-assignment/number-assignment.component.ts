import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-number-assignment',
  templateUrl: './number-assignment.component.html',
  styleUrls: ['./number-assignment.component.css']
})
export class NumberAssignmentComponent implements OnInit {

  archive = faArchive;

  displayedColumns: string[] = ['offeringNumber', 'name', 'nickName', 'address', 'archive'];
  message = '';

  members: any;
  oldOfferingNumbers = new Array();
  currentMember = null;
  currentIndex = -1;
  name = '';
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 100];
  sortBy = 'offeringNumber';

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveMembers();
  }

  getRequestParams(searchName, page, pageSize, sortBy): any {
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

    if (sortBy) {
      params[`sortBy`] = sortBy;
    }
    return params;
  }

  retrieveMembers(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize, this.sortBy);
    this.oldOfferingNumbers = [];

    this.memberService.getAll(params)
      .subscribe(
        response => {
          const { members, totalItems } = response;
          this.members = members;
          for (let entry of this.members) {
            this.oldOfferingNumbers.push(entry.offeringNumber);
          }
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

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveMembers();
  }

  updateOfferingNumber(member, index): void {
    this.memberService.updateOfferinNumber(member)
      .subscribe(
        response => {
          this.oldOfferingNumbers[index] = member.offeringNumber;
          console.log(response);
          this.message = 'The offering #' + response.offeringNumber + ' was updated successfully!';
        },
        error => {
          member.offeringNumber = this.oldOfferingNumbers[index];
          this.message = error.error.message + member.offeringNumber;
        });
    console.log(this.message);

  }

  archiveOffering(offeringNumber): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Archive Offerings',
        message: 'Are you sure, you want to archive Offerings and delete it?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {

        let params = {};
        if (offeringNumber) {
          params[`offeringNumber`] = offeringNumber;
        }
        let today = new Date();
        params[`year`] = today.getFullYear();

        this.memberService.archiveOffering(params)
          .subscribe(
            response => {
              console.log(response);
              this.message = 'The offering #' + offeringNumber + ' was archived successfully!';
            },
            error => {
              console.log(error);
              this.message = error.error.message;
            });
        console.log(this.message);
      }
    });
  }

}
