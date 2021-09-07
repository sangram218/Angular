import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private authService:AuthService,private route:Router) { }

  canActivate(){
    if(this.authService.currentUser.admin) return true;

    this.route.navigate(['/no-access']);
    return false;
  }

}
