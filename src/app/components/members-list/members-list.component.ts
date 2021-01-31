import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  displayedPhoneColumns: string[] = ['type', 'number', 'reference'];

  members: any;
  currentMember = null;
  currentIndex = -1;
  name = '';
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 100];
  isMembership: boolean = false;

  constructor(
    private memberService: MemberService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.retrieveMembers();
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

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveMembers();
  }

  setActiveMember(member, index): void {
    this.currentMember = member;
    this.currentIndex = index;
    this.isMembership = this.tokenStorage.getUser().roles.includes('ROLE_MEMBERSHIP');
  }

  removeAllMembers(): void {
    this.memberService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveMembers();
        },
        error => {
          console.log(error);
        });
  }
}
