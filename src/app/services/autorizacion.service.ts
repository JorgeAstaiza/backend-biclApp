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
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
  }
  public registro = (email, password) => {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  }
  getStatus(){
    return this.angularFireAuth.authState;
  }
  logOut(){
    return this.angularFireAuth.auth.signOut();
  }
  public isLogged(){
    return this.angularFireAuth.authState;
  }
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) { 
    this.isLogged();
  }
}
