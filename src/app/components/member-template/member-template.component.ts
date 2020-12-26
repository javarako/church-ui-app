import { Component, Input, OnInit } from '@angular/core';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

interface OptionValue {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-member-template',
  templateUrl: './member-template.component.html',
  styleUrls: ['./member-template.component.css']
})
export class MemberTemplateComponent implements OnInit {

  @Input() public currentMember : any = null;

  plusSquare = faPlusSquare;
  trashAlt = faTrashAlt;

  provinceTypes: OptionValue[] = [
    {value: 'NL', viewValue: 'Newfoundland and Labrador'}, 
    {value: 'PE', viewValue: 'Prince Edward Island'}, 
    {value: 'NS', viewValue: 'Nova Scotia'}, 
    {value: 'NB', viewValue: 'New Brunswick'}, 
    {value: 'QC', viewValue: 'Quebec'}, 
    {value: 'ON', viewValue: 'Ontario'}, 
    {value: 'MB', viewValue: 'Manitoba'}, 
    {value: 'SK', viewValue: 'Saskatchewan'}, 
    {value: 'AB', viewValue: 'Alberta'}, 
    {value: 'BC', viewValue: 'British Columbia'}, 
    {value: 'YT', viewValue: 'Yukon'}, 
    {value: 'NT', viewValue: 'Northwest Territories'}, 
    {value: 'NU', viewValue: 'Nunavut'}
  ];
  countryTypes: OptionValue[] = [
    {value: 'CA', viewValue: 'Canada'}, 
    {value: 'US', viewValue: 'United States'}
  ];  

  phoneTypes: string[] = ['Home', 'Work', 'Cell', 'Other'];
  displayedPhoneColumns: string[] = ['type', 'number', 'extension', 'action'];
  newPhone: any = {}; 

  constructor() { }

  ngOnInit(): void {
  }

    //Phone Dialog handle start ------------------------------------
    addRow() {
      this.newPhone = {id:null, type:null, countryCode:null, number:null, extension:null, member:null};  
      this.currentMember.phones.push( this.newPhone );
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
