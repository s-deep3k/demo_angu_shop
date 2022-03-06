import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  constructor(private http :HttpClient) { }
  signup(email:string,password:string){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.api_key}`,{
      email,
      password,
      returnSecureToken:true
    }).pipe(catchError(this.errorHandler))
  }
  login(email:string,password:string){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.api_key}`,{
      email,
      password,
      returnSecureToken:true
    }).pipe(catchError(this.errorHandler))
  }
  errorHandler(error:HttpErrorResponse){
    let errorMessage='An unknown error occurred!'
    if(!error.error || !error.error.error)
      return throwError(()=>errorMessage)
    switch(error.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage='The Email already exists!'
    }
    return throwError(()=>errorMessage)
  }
}
