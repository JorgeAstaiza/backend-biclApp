import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { CrudService } from 'src/app/services/crud.service';
import * as firebase from 'firebase';
import { element } from '@angular/core/src/render3';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  tiempo;
  poblacion;
  semestres;
  carreras;
  tipoSeleccionado: string = '0';
  verSeleccion: string = '';
  visible: boolean = false;
  carreraSeleccionada: string = '0';
  semestreSeleccionado: string = '0';
  tipo: string = '';
  userList= [];
  contador: number = 0;
  contadorList = [];
  masVistos = [];
  userListOrdenados = [] 
  constructor(private autorizacionServices: AutorizacionService, private router: Router, private crudService: CrudService, private firebase: AngularFireDatabase, private firebaseStorage: AngularFireStorage) {
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
    this.semestres=[1,2,3,4,5,6,7,8,9,10];
    this.carreras=['Ingeniería de Sistemas Informáticos', 'Ingeniería Electrónica', 'Ingeniería Ambiental y Sanitaria', 'Pregrado en Finanzas y Negocios Internacionales', 'Derecho', 'Administración de Empresas', 'Entrenamiento Deportivo', 'Licenciatura en Educación Infantil', 'Contaduría Pública'];
    this.tiempo=['Top de la semana', 'Top del mes', 'Top del semestre'];

  }

  ngOnInit() {
      
  }
  capturar(){
    this.verSeleccion = this.tipoSeleccionado;
    if(this.verSeleccion == 'Estudiante'){
      this.visible = true;
    }else{
      this.visible = false;
    }
    this.tipo = this.tipoSeleccionado
  }
  generarReporte(){
    this.userListOrdenados = [] 
    if(this.tipo === "Estudiante"){
      this.crudService.col$('users', ref => ref.where('tipo', '==', this.tipo).where('semestre', '==', this.semestreSeleccionado).where('carrera', '==', this.carreraSeleccionada).orderBy('contador', 'desc')).subscribe(response => response.forEach(item=>{
        this.userListOrdenados.push(item)
      }));
    }
    if(this.tipo !== "Estudiante"){
      this.crudService.col$('users', ref => ref.where('tipo', '==', this.tipo).orderBy('contador', 'desc')).subscribe(response => response.forEach(item=>{
        this.userListOrdenados.push(item)
      }));
    }
    console.log(this.userListOrdenados)
  }

  showData(items){
    items.forEach(element => {
      
      //this.userList.push(element.val())
      console.log(element.val().apellido)      
    });
  }

  prueba(){
    console.log(this.userList)
  }
  
  logout(){
    this.autorizacionServices.logOut().then(()=>{
      this.router.navigate([''])
    }).catch((err)=>{
      console.log(err);
    });
  }

}
