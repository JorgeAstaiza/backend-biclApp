import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  getAdmin(){
    return this.angularFireDatabase.list('/admin')
  }
  getUserById(uid){
    return this.angularFireDatabase.object('/admin/' + uid);
  }
  createAdmin(user){
    return this.angularFireDatabase.object('/admin/' + user.uid).set(user);
  }
  editAdmin(user){
    return this.angularFireDatabase.object('/admin/' + user.uid).set(user);
  }
}
