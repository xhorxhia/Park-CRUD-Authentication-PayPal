import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;  // shows LogOut tab in navbar
  errorMessage = '';
  roles!: string[];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      console.log("Roleeeeeeeeeeeeeeee  "+ this.tokenStorage.getUser().roles);
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false; // shows LogOut tab in navbar after reload
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
       
        //this.router.navigate(['admin']); // after login go to Games page 
        this.reloadPage();
      },
      err => {        
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;  
      }
    );  
     
  }

  reloadPage() {
    window.location.reload();
    
  }

}
