import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberService } from 'src/app/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  currentMember = null;
  message = '';

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.message = '';
    this.getMember(this.route.snapshot.paramMap.get('id'));
  }

  getMember(id): void {
    this.memberService.get(id)
      .subscribe(
        data => {
          this.currentMember = data;

          if (!this.currentMember.addresses
            || this.currentMember.addresses.length == 0) {
            this.currentMember.addresses = [{
              type: 'Home',
              address1: '',
              city: '',
              province: 'ON', //default value
              country: 'CA', //default value
              postalCode: '',
              mailingAddress: true
            }];
          }

          console.log(data);
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  updateMember(): void {
    this.memberService.update(this.currentMember.memberId, this.currentMember)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The member was updated successfully!';
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  deleteMember(): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Member',
        message: 'Are you sure, you want to remove a member?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {

        this.memberService.delete(this.currentMember.memberId)
          .subscribe(
            response => {
              console.log(response);
              this.router.navigate(['/members']);
            },
            error => {
              console.log(error);
              this.message = error.error.message;
            });
      }
    });
  }

}
