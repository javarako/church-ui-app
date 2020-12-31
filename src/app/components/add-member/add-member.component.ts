import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';

interface Member {
  name: string;
  nickName: string;
  spouseName: string;
  spouseNickName: string;
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
    primaryEmail: '',
    secondaryEmail: '',
    comment: '',
    phones: [],
    addresses: [{
      type: 'Home',
      address1: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
      mailingAddress: true
    }]
  };
  submitted = false;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
  }

  saveMember(): void {
    const data = {
      name: this.currentMember.name,
      nickName: this.currentMember.nickName,
      spouseName: this.currentMember.spouseName,
      spouseNickName: this.currentMember.spouseNickName,
      primaryEmail: this.currentMember.primaryEmail,
      secondaryEmail: this.currentMember.secondaryEmail,
      comment: this.currentMember.comment,
      phones: this.currentMember.phones,
      addresses: this.currentMember.addresses
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
      }]
    };
  }

}
