import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';

interface Member {
  name: string;
  nickName: string;
  spouseName: string;
  spouseNickName: string;
  groupCode: string,
  locationCode: string,
  birthDate: string,
  spouseBirthDate: string,
  primaryEmail: string;
  secondaryEmail: string;
  comment: string;
  phones: any[];
  addresses: any[];
}

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})

export class AddMemberComponent implements OnInit {

  currentMember = {
    name: '',
    nickName: '',
    spouseName: '',
    spouseNickName: '',
    groupCode: '',
    locationCode: '',
    birthDate: '',
    spouseBirthDate: '',
    primaryEmail: '',
    secondaryEmail: '',
    comment: '',
    phones: [],
    addresses: [{
      type: 'Home',
      address1: '',
      city: '',
      province: 'ON',
      country: 'CA',
      postalCode: '',
      mailingAddress: true
    }],
    roles: [],
    permissions: []
  };
  submitted = false;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
  }

  setRoles() {
    let roles = [];
    for (var roleType of this.currentMember.permissions) {
      roles.push({
        id: null,
        type: roleType
      });
    }
    return roles;
  }

  saveMember(): void {
    const data = {
      name: this.currentMember.name,
      nickName: this.currentMember.nickName,
      spouseName: this.currentMember.spouseName,
      spouseNickName: this.currentMember.spouseNickName,
      primaryEmail: this.currentMember.primaryEmail,
      secondaryEmail: this.currentMember.secondaryEmail,
      groupCode: this.currentMember.groupCode,
      locationCode: this.currentMember.locationCode,
      birthDate: this.currentMember.birthDate,
      spouseBirthDate: this.currentMember.spouseBirthDate,
      comment: this.currentMember.comment,
      phones: this.currentMember.phones,
      addresses: this.currentMember.addresses,
      roles: this.setRoles()
    };

    this.memberService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMember(): void {
    this.submitted = false;
    this.currentMember = {
      name: '',
      nickName: '',
      spouseName: '',
      spouseNickName: '',
      primaryEmail: '',
      secondaryEmail: '',
      groupCode: '',
      locationCode: '',
      birthDate: '',
      spouseBirthDate: '',
      comment: '',
      phones: [],
      addresses: [{
        type: 'Home',
        address1: '',
        city: '',
        province: 'ON', //default value
        country: 'CA', //default value
        postalCode: '',
        mailingAddress: true
      }],
      roles: [],
      permissions: []
    };
  }

}
