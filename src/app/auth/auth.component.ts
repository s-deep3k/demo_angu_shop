import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginMode=false
  isLoading=false
  error:string=''
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  onSwitch(){
    this.loginMode=!this.loginMode
  }
  onSubmit(authForm:NgForm){
    this.isLoading=true
    console.log(authForm.form.value);
    const email = authForm.form.value.email
    const password = authForm.form.value
    this.auth.signup(email,password).subscribe(response=>{
      console.log(response);
      this.isLoading=false
    },errorRes=>{
      console.log(errorRes.error.error.message);
      this.error='An error ocurred '+errorRes.error.error.message
      this.isLoading=false
      
    })
    authForm.reset()
  }
}
