import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Usuario } from '../models/usuario';
import { Incentivos } from '../models/incentivos';
import * as firebase from 'firebase/app';
import { Bicicleta } from '../models/bicicleta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  userList: AngularFireList<any>;
  incentivosList: AngularFireList<any>;
  bicicletaList: AngularFireList<any>;
  selectUser: Usuario = new Usuario();
  selectIncentivo: Incentivos = new Incentivos();
  selectedBicicleta: Bicicleta = new Bicicleta();

  constructor(public firebase: AngularFireDatabase) {
   }

  insertBicicleta(bicicleta: Bicicleta){
    firebase.database().ref('users/' + bicicleta.identificacion + '/bicicletas' ).set({
      color: bicicleta.color,
      marca: bicicleta.marca,
      serial: bicicleta.serial,
      tipo: bicicleta.tipo
    })
  }

  insertIncentivos(incentivos: Incentivos){
    this.incentivosList.push({
      titulo: incentivos.titulo,
      responsable: incentivos.responsable,
      descripcion: incentivos.descripcion,
      carrera: incentivos.carrera,
      semestre: incentivos.semestre,
      tipo: incentivos.tipo,
      fechaInicio: incentivos.fechaInicio,
      fechaFin: incentivos.fechaFin
    });
  }
  
  insertUser(user: Usuario){
    firebase.database().ref('users/'+ user.identificacion).set({
        nombre: user.nombre,
        apellido: user.apellido,
        carrera: user.carrera,
        semestre: user.semestre,
        tipo: user.tipo,
        email: user.email,
        genero: user.genero,
        tipoid: user.tipoid
        //avatar: user.avatar
      });
    }
  getIncentivos(){
    return this.incentivosList = this.firebase.list('incentivos');
  }
  getUsers(){
    return this.userList = this.firebase.list('users');
  }
  getBicicleta(){
    return this.bicicletaList = this.firebase.list('bicicletas');
  }
  updateUser(user: Usuario){
    this.userList.update(user.$key, {
      nombre: user.nombre,
      apellido: user.apellido,
      carrera: user.carrera,
      id: user.identificacion,
      avatar: user.avatar
    })
  }
  deleteProduct($key:string){
    this.userList.remove($key);
  }
  setAvatar(avatar, uid){
    return this.firebase.object('/users/'+ uid + '/avatar').set(avatar);
  }
}
