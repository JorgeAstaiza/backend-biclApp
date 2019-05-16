import { Component, OnInit } from '@angular/core';
import { Incentivos } from 'src/app/models/incentivos';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-incentivos',
  templateUrl: './listar-incentivos.component.html',
  styleUrls: ['./listar-incentivos.component.css']
})
export class ListarIncentivosComponent implements OnInit {

  poblacion;
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  semestres;
  carreras;
  visible: boolean = false;
  incentivosList: Incentivos[];
  constructor(private autorizacionServices: AutorizacionService, private router: Router) {
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
    this.semestres=[1,2,3,4,5,6,7,8,9,10];
    this.carreras=['Ingeniería de Sistemas Informáticos', 'Ingeniería Electrónica', 'Ingeniería Ambiental y Sanitaria', 'Pregrado en Finanzas y Negocios Internacionales', 'Derecho', 'Administración de Empresas', 'Entrenamiento Deportivo', 'Licenciatura en Educación Infantil', 'Contaduría Pública'];
   }
   capturar(){
    this.verSeleccion = this.opcionSeleccionado;
    if(this.verSeleccion == 'Estudiante'){
      this.visible = true;
    }else{
      this.visible = false;
    }
  }
  logout(){
    this.autorizacionServices.logOut().then(()=>{
      this.router.navigate([''])
    }).catch((err)=>{
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
