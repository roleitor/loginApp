import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private afAuth: AngularFireAuth,private authService:AuthService){
  }
  canActivate() {
    if(this.authService.authenticated.valueOf()){
      console.log('No esta logueado');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
