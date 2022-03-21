import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {User} from './User.model'
export interface AuthResponse{
  idToken:string, 
  email:string 	,
  refreshToken 	:string ,
  expiresIn :	string 	,
  localId :	string,
  registered?:boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData= new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any;

  constructor(private http :HttpClient,private router:Router) {}

  signup(email:string,password:string){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.api_key}`,{
      email,
      password,
      returnSecureToken:true
    }).pipe(catchError(this.errorHandler),tap((resData)=>{
      this.resDataHandler(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }))
  }

  autoLogin(){
    const user:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(localStorage.getItem('userData'))
    if(!user)
      return;
    const loadedUser = new User(user.email,user.id,user._token,new Date(user._tokenExpirationDate))
    if(loadedUser.token){
      this.userData.next(loadedUser)
      let expirationDuration= new Date(user._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration:number){
    //console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout()
    },expirationDuration)
  }

  login(email:string,password:string){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.api_key}`,{
      email,
      password,
      returnSecureToken:true
    }).pipe(catchError(this.errorHandler),tap((resData)=>{
      this.resDataHandler(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }))
  }

  logout(){
    localStorage.removeItem('userData')
    this.userData.next(null)
    this.router.navigate(['/auth'])
    if(this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer)
  }


  private errorHandler(error:HttpErrorResponse){
    let errorMessage='An unknown error occurred!'
    if(!error.error || !error.error.error)
      return throwError(()=>errorMessage)
    switch(error.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage='The email already exists!'
        break
      case 'EMAIL_INVALID':
        errorMessage='No user found with that email!'
    }
    return throwError(()=>errorMessage)
  }

  private resDataHandler(email:string,userId:string,token:string,expiresIn:number){
    const tokenExpiry=new Date(new Date().getTime()+ expiresIn*1000)
    const user = new User(email,userId,token,tokenExpiry)
    localStorage.setItem('userData',JSON.stringify(user))
    this.userData.next(user)
    this.autoLogout(expiresIn*1000)
  }
}
