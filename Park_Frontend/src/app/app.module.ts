import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeAuthComponent } from './home-auth/home-auth.component';
import { WebSocketAPI } from 'src/WebSocketAPI';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService as AuthGuard } from './_services/auth.service';
import { PayPalComponent } from './pay-pal/pay-pal.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    AppComponent,
    BoardAdminComponent,
    BoardUserComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GameHomeComponent,
    HomeAuthComponent,
    PayPalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxPayPalModule

  ],
  providers: [WebSocketAPI,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
