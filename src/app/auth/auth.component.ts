import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginMode=false
  isLoading=false
  error:string=''
  authObs:Observable<AuthResponse>
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
    const password = authForm.form.value.password

    if(!this.loginMode){
      this.authObs=this.auth.signup(email,password)
    }else{
      this.authObs=this.auth.login(email,password)
    }

    this.authObs.subscribe(response=>{
      this.error=''
      console.log(response);
      this.isLoading=false
    },errorRes=>{
      console.log(errorRes);
      this.error='An error ocurred : '+errorRes
      this.isLoading=false
    })
    authForm.reset()
  }
}
