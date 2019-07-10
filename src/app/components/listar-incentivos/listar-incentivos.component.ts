import { Component, OnInit } from '@angular/core';
import { Incentivos } from 'src/app/models/incentivos';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr'
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listar-incentivos',
  templateUrl: './listar-incentivos.component.html',
  styleUrls: ['./listar-incentivos.component.css']
})
export class ListarIncentivosComponent implements OnInit {
  banderaEncontrado: boolean = false;
  incentivoConsultado = [];
  editando: boolean = false;
  editingIncentivo: Incentivos;
  poblacion;
  opcionSeleccionado: string = '0';
  semestreSeleccionado: string = '0';
  carreraSeleccionado: string = '0';
  verSeleccion: string = '';
  semestres;
  carreras;
  visible: boolean = false;
  incentivosList=[];
  incentivos: Incentivos;
  keyIncentivo;
  consultaDocente: boolean = false;
  cont = 0
  tipo: string = '';
  constructor(private autorizacionServices: AutorizacionService, private router: Router, private crudService: CrudService, private toaster: ToastrService, public db: AngularFirestore) {
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro', 'Todos'];
    this.semestres=[1,2,3,4,5,6,7,8,9,10];
    this.carreras=['Ingeniería de Sistemas Informáticos', 'Ingeniería Electrónica', 'Ingeniería Ambiental y Sanitaria', 'Pregrado en Finanzas y Negocios Internacionales', 'Derecho', 'Administración de Empresas', 'Entrenamiento Deportivo', 'Licenciatura en Educación Infantil', 'Contaduría Pública'];
   }

   ngOnInit() {
    this.crudService.getIncentivos()
    .subscribe(item =>{
      this.incentivosList = item;
      
    })
    
  }
   capturar(){
    this.verSeleccion = this.opcionSeleccionado;
    if(this.verSeleccion == 'Estudiante'){
      this.visible = true;
    }else{
      this.visible = false;
    }
    this.tipo = this.opcionSeleccionado
    console.log(this.tipo)
  } 
  editIncentivo(event, incentivo){
    this.editIncentivo = incentivo;
    this.editando = !this.editando;
  }
  updateIncentivo(){
    this.crudService.updateIncentivo(this.editingIncentivo);
    this.editingIncentivo = {} as Incentivos
    this.editando = false;
  }
  consultaPersonalizada(){   
    this.incentivoConsultado = [] 
    if(this.tipo === "Estudiante"){
      this.crudService.col$('incentivos', ref => ref.where('tipo', '==', this.tipo).where('semestre', '==', this.semestreSeleccionado).where('carrera', '==', this.carreraSeleccionado)).subscribe(response => response.forEach(item=>{
        this.incentivoConsultado.push(item)
      }));
    }
    if(this.tipo !== "Estudiante"){
      this.crudService.col$('incentivos', ref => ref.where('tipo', '==', this.tipo)).subscribe(response => response.forEach(item=>{
        this.incentivoConsultado.push(item)
      }));
    }
    
    
    console.log(this.incentivoConsultado)
  }
  
  deleteIncentivo(event, incentivo){
    this.crudService.deleteIncentivo(incentivo)
    this.toaster.success('Operacion Satisfactoria', 'Incentivo eliminado');
    
  }
  logout(){
    this.autorizacionServices.logOut().then(()=>{
      this.router.navigate([''])
    }).catch((err)=>{
      console.log(err);
    });
  }

  

}
