import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Incentivos } from '../models/incentivos';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import * as firebase from 'firebase/app';
import { Bicicleta } from '../models/bicicleta';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type CollentionPredicate<T> = string | AngularFirestoreCollection;
type DocumentPredicate<T> = string | AngularFirestoreDocument;


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  userCollection: AngularFirestoreCollection<Usuario>
  incentivoCollection: AngularFirestoreCollection<Incentivos>
  bicicletaCollection: AngularFirestoreCollection<Bicicleta>
  users: Observable<Usuario[]>;
  incentivos: Observable<Incentivos[]>
  bicicleta: Observable<Bicicleta[]>
  userDoc: AngularFirestoreDocument<Usuario>;
  incentivoDoc: AngularFirestoreDocument<Incentivos>;
  bicicletaDoc: AngularFirestoreDocument<Bicicleta>;
  contadorBici: number = 0;
  reporte: Observable<Bicicleta>
  idRandom = Math.random().toString(15).substring(2);
  constructor(public db: AngularFirestore) {
    //this.users = this.db.collection('users').valueChanges();
    this.userCollection = this.db.collection('users');
    this.users = this.userCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=> {
        const data = a.payload.doc.data() as Usuario;
        data.id = a.payload.doc.id;
        return data;
      })
    }));

    this.incentivoCollection = this.db.collection('incentivos');
    this.incentivos = this.incentivoCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=> {
        const data = a.payload.doc.data() as Incentivos;
        data.id = a.payload.doc.id;
        return data;
      })  
    }));

    this.bicicletaCollection = this.db.collection('bicicletas');
    this.bicicleta = this.bicicletaCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=> {
        const data = a.payload.doc.data() as Bicicleta;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
   }

 
  insertBicicleta(bicicleta: Bicicleta){
    //this.bicicletaCollection.add(bicicleta);
    this.db.collection("bicicletas").doc(bicicleta.id).set(bicicleta)
  }
  insertIncentivos(incentivos: Incentivos){
    this.incentivoCollection.add(incentivos);
  }
  
  insertUser(user: Usuario){
    //this.userCollection.add(user);
    this.db.collection("users").doc(user.email).set(user)
    }
    
  updateUser(user: Usuario){
    this.userDoc = this.db.doc(`users/${user.id}`);
    this.userDoc.update(user);
  }
  updateIncentivo(incentivo: Incentivos){
    this.incentivoDoc = this.db.doc(`users/${incentivo.id}`);
    this.incentivoDoc.update(incentivo);
  }
  updateBike(bicicleta: Bicicleta){
    this.bicicletaDoc = this.db.doc(`bicicletas/${bicicleta.id}`);
      this.bicicletaDoc.update(bicicleta);
    }
  getIncentivos(){
    return this.incentivos;
  }
  getUsers(){
    //return this.users;
    return this.db.collection('users').snapshotChanges();
  }
  getBicicleta(){
    return this.bicicleta;
  }
  
  deleteProduct(user: Usuario){
    this.userDoc = this.db.doc('users/' + user.id);
    this.userDoc.delete();
  }
  deleteBike(bicicleta: Bicicleta){
    this.bicicletaDoc = this.db.doc('bicicleta/' + bicicleta.id);
    this.bicicletaDoc.delete();
  }
  deleteIncentivo(incentivo: Incentivos){
    this.incentivoDoc = this.db.doc('incentivos/' + incentivo.id);
    this.bicicletaDoc.delete();
  }
  
  setAvatar(avatar, uid){
    return this.db.collection('users').doc(uid).update({
      avatar: avatar
    })
  }
  setAvatarBike(avatar, uid){
    return this.db.collection('bicicletas').doc(uid).update({
      "avatar": avatar
    })
    console.log(this.idRandom)
  }
  

  col$<T>(ref:CollentionPredicate<T>, queryFn?):Observable<any[]>{
    return this.col(ref,queryFn).snapshotChanges().pipe(
      map(docs => {
         return docs.map(d => {
           const data = d.payload.doc.data();
           const id = d.payload.doc.id;
           return  { id, ...data}
         })
      })
    )
  }
  private col<T>(ref:CollentionPredicate<T>, queryFn?): AngularFirestoreCollection{
    return typeof ref === "string"? this.db.collection(ref,queryFn): ref;
  }
}
