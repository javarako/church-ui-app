import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-expenditure-details',
  templateUrl: './expenditure-details.component.html',
  styleUrls: ['./expenditure-details.component.css']
})
export class ExpenditureDetailsComponent implements OnInit {
  currentItem = null;
  message = '';

  constructor(
    private expenditureService: ExpenditureService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.message = '';
    this.get(this.route.snapshot.paramMap.get('id'));
  }

  get(id): void {
    this.expenditureService.get(id)
      .subscribe(
        data => {
          this.currentItem = data;
          console.log(data);
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  update(): void {
    this.expenditureService.update(this.currentItem.id, this.currentItem)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The expenditure was updated successfully!';
        },
        error => {
          console.log(error);
          this.message = error.error.message;
        });
  }

  delete(): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Expenditure',
        message: 'Are you sure, you want to remove an expenditure?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {

        this.expenditureService.delete(this.currentItem.id)
          .subscribe(
            response => {
              console.log(response);
              this.router.navigate(['/expenditures']);
            },
            error => {
              console.log(error);
              this.message = error.error.message;
            });
      }
    });
  }

}
