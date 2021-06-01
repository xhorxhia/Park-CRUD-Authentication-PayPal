import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { User } from '../models/User';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user!: User;


  constructor(private http: HttpClient, private token: TokenStorageService, private router: Router) { } //, public jwtHelper: JwtHelperService

  login(credentials: { username: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: { username: any; email: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  // check whether the user is authenticated or not
  isAuthenticated(): boolean {
    const tokeni = this.token.getToken();
    if (tokeni !== null) {
      return true
    }
    return false
  }

  // indicates whether or not navigation to a route should be allowed
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    console.log("sasdasdasd " + expectedRole)

    this.user = this.token.getUser();
    if (this.isAuthenticated()) {
      console.log("0 ")
      console.log("sasdasdasd " + expectedRole)
      if (expectedRole === undefined) {
    

        return true;
      }
   
       if(this.user.roles.includes(expectedRole)) {
        console.log("2")
        return true;
      } 
      
      else {
        this.router.navigate(['home']);
        console.log("userrrrrrrrr ", this.token.getUser());
        console.log("3 ")
        return false;
      }
    }
    this.router.navigate(['login']);
    console.log("4 ")
    return false;
  }




}
