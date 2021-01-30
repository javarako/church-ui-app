import { Component, Input, OnInit } from '@angular/core';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { CodesService, OptionValue } from 'src/app/services/codes.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-member-template',
  templateUrl: './member-template.component.html',
  styleUrls: ['./member-template.component.css']
})
export class MemberTemplateComponent implements OnInit {

  @Input() public currentMember: any = null;

  plusSquare = faPlusSquare;
  trashAlt = faTrashAlt;

  provinceTypes: OptionValue[] = [
    { id: 0, type: 'province', value: 'NL', viewValue: 'Newfoundland and Labrador' },
    { id: 0, type: 'province', value: 'PE', viewValue: 'Prince Edward Island' },
    { id: 0, type: 'province', value: 'NS', viewValue: 'Nova Scotia' },
    { id: 0, type: 'province', value: 'NB', viewValue: 'New Brunswick' },
    { id: 0, type: 'province', value: 'QC', viewValue: 'Quebec' },
    { id: 0, type: 'province', value: 'ON', viewValue: 'Ontario' },
    { id: 0, type: 'province', value: 'MB', viewValue: 'Manitoba' },
    { id: 0, type: 'province', value: 'SK', viewValue: 'Saskatchewan' },
    { id: 0, type: 'province', value: 'AB', viewValue: 'Alberta' },
    { id: 0, type: 'province', value: 'BC', viewValue: 'British Columbia' },
    { id: 0, type: 'province', value: 'YT', viewValue: 'Yukon' },
    { id: 0, type: 'province', value: 'NT', viewValue: 'Northwest Territories' },
    { id: 0, type: 'province', value: 'NU', viewValue: 'Nunavut' }
  ];
  countryTypes: OptionValue[] = [
    { id: 0, type: 'country', value: 'CA', viewValue: 'Canada' },
    { id: 0, type: 'country', value: 'US', viewValue: 'United States' }
  ];
  roleTypes: OptionValue[] = [
    { id: 0, type: 'role', value: 'ROLE_USER', viewValue: 'User' },
    { id: 0, type: 'role', value: 'ROLE_ADMIN', viewValue: 'Administrator' },
    { id: 0, type: 'role', value: 'ROLE_TREASURER', viewValue: 'Treasurer' },
    { id: 0, type: 'role', value: 'ROLE_MEMBERSHIP', viewValue: 'Membership' }
  ];
  //Location_1("1 구역"), 
  locationCodes: OptionValue[];
  //Samaritan, Emmao, John, Joseph, Jonah
  groupCodes: OptionValue[];
  phoneTypes: string[] = ['Home', 'Work', 'Cell', 'Other'];
  displayedPhoneColumns: string[] = ['type', 'number', 'reference', 'action'];
  newPhone: any = {};

  isAdmin: boolean;

  constructor(
    private codesService: CodesService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.codesService.get('LOCATION_CODE')
      .subscribe(
        response => {
          console.log(response);
          this.locationCodes = response;
        },
        error => {
          console.log(error);
        });

    this.codesService.get('GROUP_CODE')
      .subscribe(
        response => {
          console.log(response);
          this.groupCodes = response;
        },
        error => {
          console.log(error);
        });

    this.isAdmin = this.tokenStorage.getUser().roles.includes('ROLE_ADMIN');
  }

  //Phone Dialog handle start ------------------------------------
  addRow() {
    this.newPhone = { id: null, type: null, countryCode: null, number: null, reference: null, member: null };
    this.currentMember.phones.push(this.newPhone);
    this.currentMember.phones = [...this.currentMember.phones];
    console.log(this.currentMember.phones);
    return true;
  }

  deleteRow(id) {
    this.currentMember.phones = this.currentMember.phones.filter((value, key) => {
      return value.id != id;
    });
  }
  //Phone Dialog handle end ------------------------------------

}
