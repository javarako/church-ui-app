import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-constants',
  templateUrl: './global-constants.component.html',
  styleUrls: ['./global-constants.component.css']
})
export class GlobalConstantsComponent implements OnInit {

  public static apiURL: string = "http://ec2-52-91-145-141.compute-1.amazonaws.com:8081";

  constructor() { }

  ngOnInit(): void {
  }

}
