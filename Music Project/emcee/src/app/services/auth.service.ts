import { Injectable } from '@angular/core';
// import { JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(){
    // admin = true
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNhbmdyYW0gSmFndGFwIiwiYWRtaW4iOnRydWV9.KHXZcY1zY332XQThD9xCqElP_WSavjZQAjqiPjX3_LI'
    // admin = false
    // return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNhbmdyYW0gSmFndGFwIiwiYWRtaW4iOmZhbHNlfQ.pjUV4gFjnSFuHyT_xDDe1w32MS-lHbm6gWz9r_so1YU'
  }

  login(credentials:any){
    // console.log(credentials)
    if(credentials.username === 'sangram@domain.com' && credentials.password === '1234'){
      let token = this.getToken()
      localStorage.setItem('token',token);
      return true
    }
    return false
  }

  isLoggedIn(){
    // return tokenNotExpired();
    // return true

      // let jwtHelper = new JwtHelper();
    // let token = localStorage.getItem('token');
    // if(!token)
    //   return false;
    // let expirationDate = jwtHelper.getTokenExpirationDate(token);
    // let isExpired = jwtHelper.isTokenExpired(token);

    // return !isExpired;

    const jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if(!token)
      return false;
    // const decodedToken = helper.decodeToken(myRawToken);
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }
  
  logout(){
    localStorage.removeItem('token')
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token) return null;
    let jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

}
