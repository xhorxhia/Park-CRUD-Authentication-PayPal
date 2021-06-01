import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
//import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';
import {AuthService as AuthGuard} from './_services/auth.service';
// import { RoleGuardService as RoleGuard } from './_services/role-guard.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { HomeAuthComponent } from './home-auth/home-auth.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { PayPalComponent } from './pay-pal/pay-pal.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home-auth', component: HomeAuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'allGames', component: GameHomeComponent ,canActivate: [AuthGuard]}, // only authenticated users will reach this route
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMIN' } }, // only andim can access this route
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'pay', component: PayPalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
