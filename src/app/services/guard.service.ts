import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutorizacionService } from './autorizacion.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
  loggenIn = false;
  constructor(private autorizacionService: AutorizacionService, private router: Router){
    this.autorizacionService.isLogged()
      .subscribe((result)=>{
        if(result && result.uid){
          this.loggenIn = true;
        }else{
          this.loggenIn = false;
        }
      }, (err)=>{
        this.loggenIn = false;
      })
  }
  canActivate(){
    return this.loggenIn;
  }
}
