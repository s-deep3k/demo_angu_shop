import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.api_key}`,{
      email,
      password,
      returnSecureToken:true
    })
  }
}
