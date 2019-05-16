import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { NgForm } from '@angular/forms';
import { Incentivos } from 'src/app/models/incentivos';
import { Router } from '@angular/router';
import { AutorizacionService } from 'src/app/services/autorizacion.service';

@Component({
  selector: 'app-incentivos',
  templateUrl: './incentivos.component.html',
  styleUrls: ['./incentivos.component.css']
})
export class IncentivosComponent implements OnInit {
  semestres;
  carreras;
  poblacion;
  semestreSeleccionado: string = '0';
  carreraSeleccionada: string = '0'
  tipoSeleccionado: string = '0';
  verSeleccion: string = '0';
  visible:boolean = false;
  fechaInicio: string = '0';
  fechaFin: string = '0';
  constructor(private crudService: CrudService, private router: Router, private autorizacionServices: AutorizacionService) {
    this.semestres=[1,2,3,4,5,6,7,8,9,10];
    this.carreras=['Ingeniería de Sistemas Informáticos', 'Ingeniería Electrónica', 'Ingeniería Ambiental y Sanitaria', 'Pregrado en Finanzas y Negocios Internacionales', 'Derecho', 'Administración de Empresas', 'Entrenamiento Deportivo', 'Licenciatura en Educación Infantil', 'Contaduría Pública'];
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
    
  }

  ngOnInit() {
    this.crudService.getIncentivos();
  }
  fechaInicioSeleccionada(){
    this.fechaInicio;
  }
  semestreUsuario(){
    this.semestreSeleccionado;
  }

  carreraUsuario(){
    this.carreraSeleccionada;
  }
  capturar(){
    this.verSeleccion = this.tipoSeleccionado;
    if(this.verSeleccion == 'Estudiante'){
      this.visible = true;
    }else{
      this.visible = false;
    }
  }
  onSubmitIncentivo(incentivoForm: NgForm) {
    this.crudService.insertIncentivos(incentivoForm.value);
    this.resetForm(incentivoForm);
  }

  resetForm(incentivoForm: NgForm){
    if(incentivoForm != null){
      incentivoForm.reset();
      this.crudService.selectIncentivo = new Incentivos();
    }
  }
  logout(){
    this.autorizacionServices.logOut().then(()=>{
      this.router.navigate([''])
    }).catch((err)=>{
      console.log(err);
    });
  }

}
