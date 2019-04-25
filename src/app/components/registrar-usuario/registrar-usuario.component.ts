import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  poblacion;
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  identificacion;
  semestres;
  carreras;
  visible: boolean = false;
  constructor(private formBuilder: FormBuilder) { 
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
    this.identificacion=['Cédula de ciudadanía', 'Codigo Estudiantil', 'Tarjeta de identidad', 'Tarjeta de pasaporte']
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

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
  
  });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}
}

