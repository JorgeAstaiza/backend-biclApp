import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incentivos',
  templateUrl: './incentivos.component.html',
  styleUrls: ['./incentivos.component.css']
})
export class IncentivosComponent implements OnInit {
  chekeado: boolean = false;
  semestres;
  carreras;
  constructor() {
    this.semestres=[1,2,3,4,5,6,7,8,9,10];
    this.carreras=['Ingeniería de Sistemas Informáticos', 'Ingeniería Electrónica', 'Ingeniería Ambiental y Sanitaria', 'Pregrado en Finanzas y Negocios Internacionales', 'Derecho', 'Administración de Empresas', 'Entrenamiento Deportivo', 'Licenciatura en Educación Infantil', 'Contaduría Pública'];
   }

  ngOnInit() {
  }

  visibleEstudiantes(){
    if(this.chekeado == false){
      this.chekeado = true;
    }else{
      this.chekeado = false;
    }
  }

}
