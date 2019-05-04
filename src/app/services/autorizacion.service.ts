import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {
  user: User;
  public login = (email, password) => {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response)=>{
        //alert('usuario logeado con exito');
        this.router.navigate(['/inicio'])
        console.log(response);
      })
      .catch((err)=>{
        //alert('error');
        this.router.navigate([''])
        console.log(err);
      })
  }
  public registro = (email, password) => {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response)=>{
        alert('usuario registrado con exito');
        console.log(response);
      })
      .catch((err)=>{
        alert('error');
        console.log(err);
      })
  }

  public isLogged(){
    return this.angularFireAuth.authState;
  }

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) { 
    this.isLogged();
  }
}
