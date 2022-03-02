import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginMode=false
  constructor() { }

  ngOnInit(): void {
  }
  onSwitch(){
    this.loginMode=!this.loginMode
  }
  onSubmit(authForm:HTMLFormElement){
    console.log(authForm);
    
  }
}
