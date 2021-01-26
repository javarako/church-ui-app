import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

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

  plusSquare = faPlusSquare;
  trashAlt = faTrashAlt;

  displayedColumns: string[] = ['name', 'spouse'];
  displayedVisitorColumns: string[] = ['visitor', 'action'];
  message = '';

  sunday: Date = this.getSundayFromToday();
  members: any;
  visitors: any;
  visitor: any;
  maxVisitorId = 10000;
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

    //find max id
    if (this.visitors) {
      this.visitors.forEach(function (entry) {
        console.log(entry);
        if (entry.memberId > this.maxVisitorId) {
          this.maxVisitorId = entry.memberId;
        }
      });
    }
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
    this.attendanceService.update(model)
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

  //Visitor Dialog handle start ------------------------------------
  /*
    private Long id;
    private Date date;
    private Long memberId;//visitor id starts from 10001 per each date
    private String name;
    private boolean attendance;
    private String spouseName;
    private boolean spouseAttendance;
    private String visitorName;    
  */
  addRow() {
    this.maxVisitorId += 1;
    this.visitor = {
      id: null,
      date: this.sunday,
      memberId: this.maxVisitorId,
      name: null, attendance: false, spouseName: null, spouseAttendance: false,
      visitorName: null
    };

    this.visitors.push(this.visitor);
    this.visitors = [...this.visitors];
    console.log(this.visitors);
    return true;
  }

  deleteRow(model) {
    let params = {};

    if (model.date) {
      params[`sunday`] = new Date(model.date);
    }

    if (model.memberId) {
      params[`memberId`] = model.memberId;
    }

    this.attendanceService.deleteVisitor(params)
      .subscribe(
        response => {
          console.log(response);

          this.visitors = this.visitors.filter((value, key) => {
            return value.memberId != model.memberId;
          });

        },
        error => {
          console.log(error);
        });
  }
  //Visitor Dialog handle end ------------------------------------

}
