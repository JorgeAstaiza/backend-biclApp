import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { NgForm } from '@angular/forms';
import { Incentivos } from 'src/app/models/incentivos';
import { Router } from '@angular/router';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-incentivos',
  templateUrl: './incentivos.component.html',
  styleUrls: ['./incentivos.component.css']
})
export class IncentivosComponent implements OnInit {
  incentivos = {} as Incentivos
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
  constructor(private crudService: CrudService, private router: Router, private autorizacionServices: AutorizacionService, private toaster: ToastrService) {
    this.semestres=[1,2,3,4,5,6,7,8,9,10];
    this.carreras=['Ingeniería de Sistemas Informáticos', 'Ingeniería Electrónica', 'Ingeniería Ambiental y Sanitaria', 'Pregrado en Finanzas y Negocios Internacionales', 'Derecho', 'Administración de Empresas', 'Entrenamiento Deportivo', 'Licenciatura en Educación Infantil', 'Contaduría Pública'];
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro', 'Todos'];
    
  }

  ngOnInit() {
    //this.crudService.getIncentivos();
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
    this.verSeleccion = this.incentivos.tipo;
    if(this.verSeleccion == 'Estudiante'){
      this.visible = true;
    }else{
      this.visible = false;
    }
  }
  addIncentivo(incentivoForm: NgForm){
    this.crudService.insertIncentivos(this.incentivos);
    this.toaster.success('Operacion Satisfactoria', 'Incentivo Registrado');
    incentivoForm.reset();
  }

  /*
  onSubmitIncentivo(incentivoForm: NgForm) {
    if(incentivoForm.valid && this.crudService.selectIncentivo.titulo != '' && this.crudService.selectIncentivo.responsable != '' && this.tipoSeleccionado != '' && this.carreraSeleccionada != '' && this.semestreSeleccionado != '' && this.crudService.selectIncentivo.descripcion != ''){
      this.crudService.insertIncentivos(incentivoForm.value);
      this.resetForm(incentivoForm);
      this.toaster.success('Operacion Satisfactoria', 'Incentivo eliminado');
    }else{
      this.toaster.error('Formulario invalido', 'Verifique todos los campos del formulario');
    }
    
  }*/
  comprobarFormulario(){
    /*
    console.log(this.carreraSeleccionada)
    console.log(this.semestreSeleccionado)
    if(this.crudService.selectIncentivo.titulo == null || this.crudService.selectIncentivo.titulo == ''){
      this.toaster.error('ERROR!', 'El titulo del incentivo es obligatorio');
    }
    if(this.crudService.selectIncentivo.responsable == null || this.crudService.selectIncentivo.responsable == ''){
      this.toaster.error('ERROR!', 'El reponsable del incentivo es obligatorio');
    }
    if(this.tipoSeleccionado== null || this.tipoSeleccionado == ''){
      this.toaster.error('ERROR!', 'La poblacion al que va dirigido el incentivo es obligatorio');
    }
    if(this.carreraSeleccionada == '0' && this.tipoSeleccionado == "Estudiante"){
      this.toaster.error('ERROR!', 'La carrera al que va dirigido el incentivo es obligatorio');
    }
    if(this.semestreSeleccionado == '0' && this.tipoSeleccionado == "Estudiante"){
      this.toaster.error('ERROR!', 'El semestre al que va dirigido el incentivo es obligatorio');
    }
    if(this.crudService.selectIncentivo.descripcion == null || this.crudService.selectIncentivo.descripcion == ''){
      this.toaster.error('ERROR!', 'La descripcion del incentivo es obligatorio');
    }
    if(this.crudService.selectIncentivo.fechaInicio == null || this.crudService.selectIncentivo.fechaInicio == ''){
      this.toaster.error('ERROR!', 'La fecha de inicio del incentivo es obligatorio');
    }
    if(this.crudService.selectIncentivo.fechaFin == null || this.crudService.selectIncentivo.fechaFin == ''){
      this.toaster.error('ERROR!', 'La fecha de finalizacion del incentivo es obligatorio');
    }*/
  }

  resetForm(incentivoForm: NgForm){
    if(incentivoForm != null){
      incentivoForm.reset();
      this.tipoSeleccionado = ''
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
