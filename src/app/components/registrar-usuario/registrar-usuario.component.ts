import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
//servicio
import { CrudService } from 'src/app/services/crud.service';
import { Usuario } from 'src/app/models/usuario';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';
import { FirebaseFirestore } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage'
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
 
export class RegistrarUsuarioComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  poblacion;
  identificaciones;
  semestres;
  carreras;
  genero;
  visible: boolean = false;
  registrarUsuario: boolean = false;
  carreraSeleccionada: string = '0';
  semestreSeleccionado: string = '0';
  idSeleccionado: string = '0';
  tipoSeleccionado: string = '0';
  verSeleccion: string = '';
  generoSeleccionado: string = '0';
  tipoid: string = '0';
  email: string = null;
  emailUs: string = null;
  UserPassword: string = null;
  public isError = false;
  constructor(private formBuilder: FormBuilder, 
    private crudService: CrudService, 
    private autorizacionServices: AutorizacionService, 
    private router: Router,
    private toaster: ToastrService
    ) { 
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
    this.identificaciones=['Cédula de ciudadanía', 'Codigo Estudiantil', 'Tarjeta de identidad', 'Tarjeta de pasaporte']
    this.semestres=[1,2,3,4,5,6,7,8,9,10];
    this.carreras=['Ingeniería de Sistemas Informáticos', 'Ingeniería Electrónica', 'Ingeniería Ambiental y Sanitaria', 'Pregrado en Finanzas y Negocios Internacionales', 'Derecho', 'Administración de Empresas', 'Entrenamiento Deportivo', 'Licenciatura en Educación Infantil', 'Contaduría Pública'];
    this.genero=['Hombre', 'Mujer']
    
  }
  ngOnInit(){
    this.crudService.getUsers();
  }

  capturar(){
    this.verSeleccion = this.tipoSeleccionado;
    if(this.verSeleccion == 'Estudiante'){
      this.visible = true;
    }else{
      this.visible = false;
      this.semestreSeleccionado = "Sin Semestre"
      this.carreraSeleccionada = "Sin Carrera"
    }
  }
  generoUsuario(){
    this.generoSeleccionado;
  }
  emailUser(){
    this.email = this.crudService.selectUser.email;
  }
  idUsuario(){
    this.idSeleccionado;
  }
  semestreUsuario(){
    this.semestreSeleccionado;
  }

  carreraUsuario(){
    this.carreraSeleccionada;
  }
  tiposId(){
    this.tipoid;
  }
  
  resetForm(userForm: NgForm){
    if(userForm != null){
      userForm.reset();
      this.crudService.selectUser = new Usuario();
    }
  }
  logout(){
    this.autorizacionServices.logOut().then(()=>{
      this.router.navigate([''])
    }).catch((err)=>{
      console.log(err);
    });
  }
  onSubmit(userForm: NgForm) {     
    if (userForm.valid) {
      this.submitted = true;
      this.crudService.insertUser(userForm.value);      
      this.resetForm(userForm);
      this.toaster.success('Operacion Satisfactoria', 'Usuario Registrado');
    }else{
      this.resetForm(userForm);
      this.toaster.error('ERROR', 'Formulario invalido');
      this.generoSeleccionado = '0';
      this.tipoSeleccionado = '0';
      this.idSeleccionado = '0';
      this.semestreSeleccionado = '0';
      this.carreraSeleccionada = '0';
      this.visible = false;
    }
    
  }
  
  registrar(){
    if(this.email != null && this.UserPassword != null && this.carreraSeleccionada != '0' && this.generoSeleccionado != '0' && this.semestreSeleccionado != '0' && this.tipoSeleccionado != '0'){
      this.autorizacionServices.registro(this.email, this.UserPassword).then((data) => {
        const user = {
          //uid: data.user.uid,
          password: this.UserPassword,
          email: this.email
        }
        this.registrarUsuario = true;
        this.router.navigate(['registrar-bicicleta']);
       
        console.log('registro!')
      }).catch((err) => {
        this.registrarUsuario = false;
        this.toaster.error('Error', err);
        console.log(err)
      })
      
    } 
    if(this.crudService.selectUser.nombre == null){
      this.toaster.error('Formulario incompleto', 'El nombre es obligatorio');
    }
    if(this.crudService.selectUser.apellido == null){
      this.toaster.error('Formulario incompleto', 'El apellido es obligatorio');
    }
    if(this.carreraSeleccionada == '0'){
      this.toaster.error('Formulario incompleto', 'La carrera es obligatorio');
    }
    if(this.crudService.selectUser.email == null){
      this.toaster.error('Formulario incompleto', 'El email es obligatorio');
    }
    if(this.generoSeleccionado == '0'){
      this.toaster.error('Formulario incompleto', 'el genero es obligatorio');
    }
    if(this.idSeleccionado == '0'){
      this.toaster.error('Formulario incompleto', 'La identificacion es obligatorio');
    }
    if(this.semestreSeleccionado == '0'){
      this.toaster.error('Formulario incompleto', 'el semestre es obligatorio');
    }
    if(this.tipoSeleccionado == '0'){
      this.toaster.error('Formulario incompleto', 'el tipo de usuario es obligatorio');
    }
  }
}

