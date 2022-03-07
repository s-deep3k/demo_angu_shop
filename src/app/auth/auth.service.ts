import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
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
  userData= new Subject<User>()

  constructor(private http :HttpClient) { }
  signup(email:string,password:string){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.api_key}`,{
      email,
      password,
      returnSecureToken:true
    }).pipe(catchError(this.errorHandler),tap((resData)=>{
      this.resDataHandler(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }))
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
  private resDataHandler(email:string,userId:string,token:string,expiryDate:number){
    const tokenExpiry=new Date(new Date().getTime()+ expiryDate*1000)
    const user = new User(email,userId,token,tokenExpiry)
    this.userData.next(user)
  }
}
