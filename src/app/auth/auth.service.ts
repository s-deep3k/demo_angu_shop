import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface AuthResponse{
  idToken:string, 
email:string 	,
refreshToken 	:string ,
expiresIn :	string 	,
localId :	string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }
  signup(email:string,password:string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAE20txNfAHoDj8ktkhHX_IIgEPGizvdD8',{
      email,
      password,
      returnSecureToken:true
    })
  }
}
