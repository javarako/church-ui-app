import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { faArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent implements OnInit {

  sundayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Only able to select Sunday.
    return day == 0;
  }

  archive = faArchive;

  displayedColumns: string[] = ['name', 'spouse'];
  message = '';

  sunday = this.getSundayFromToday();
  members: any;
  visitors: any;
  currentIndex = -1;
  name = '';
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 100];
  sortBy = 'nickName';

  constructor(
    private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.retrieve();
  }

  getRequestParams(sunday, searchName, page, pageSize, sortBy): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (sunday) {
      params[`sunday`] = sunday;
    }

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

  retrieve(): void {
    const params = this.getRequestParams(this.sunday, this.name, this.page, this.pageSize, this.sortBy);

    this.attendanceService.getByDate(params)
      .subscribe(
        response => {
          const { members, visitors, totalItems } = response;
          this.members = members;
          this.visitors = visitors;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieve();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieve();
  }

  update(model): void {
    this.attendanceService.create(model)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
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
