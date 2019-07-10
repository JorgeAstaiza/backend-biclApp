import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { NgForm, FormGroup } from '@angular/forms';
import { Bicicleta } from 'src/app/models/bicicleta';
import { ToastrService } from 'ngx-toastr'
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrar-bicicleta',
  templateUrl: './registrar-bicicleta.component.html',
  styleUrls: ['./registrar-bicicleta.component.css']
})
export class RegistrarBicicletaComponent implements OnInit {
  bicicleta = {} as Bicicleta
  bikeForm: FormGroup
  registrar: boolean = false;
  tiposBici;
  userList=[];
  user: Usuario;
  x;
  idUsuario;
  tipoBicicletaSeleccionada: string = '0';
    constructor(private crudService: CrudService, private toaster: ToastrService, private firebaseStorage: AngularFireStorage, private router: Router) { 
    this.tiposBici = ['Ruta', 'Todo Terreno', 'BMX', 'Otro' ]

  }
  ngOnInit() {
    this.crudService.getUsers()
    .subscribe(item =>{
      this.userList = item;
      
    })   
  }

  tipoSeleccionado(){
    this.tipoBicicletaSeleccionada;
  }
 
  registrarBici(){
     /*
    console.log(this.crudService.selectedBicicleta.serial)
    console.log(this.crudService.selectedBicicleta.color)
    console.log(this.crudService.selectedBicicleta.tipo)
    */

    if(this.bicicleta.id == undefined || this.bicicleta.id == "" ){
      this.toaster.error('error', 'El serial de la bicicleta es obligatorio');
    }if(this.bicicleta.color == undefined || this.bicicleta.color == ""){
      this.toaster.error('error', 'El color de la bicicleta es obligatorio');
    }if(this.bicicleta.marca == "" || this.bicicleta.marca == undefined){
      this.toaster.error('error', 'La marca de la bicicleta es obligatorio');
    }if(this.bicicleta.identificacion == "" || this.bicicleta.identificacion == undefined){
      this.toaster.error('error', 'La identificacion del usuario es obligatorio');
    }
    if(this.tipoBicicletaSeleccionada == '0'){
      this.toaster.error('error', 'El tipo de bicicleta es obligatorio');
    }
  }/*
  resetForm(bikeForm: NgForm){
    if(bikeForm != null){
      bikeForm.reset();
      this.tipoBicicletaSeleccionada = '0'
      this.crudService.selectedBicicleta = new Bicicleta();
    }
    
  }*/ 
  addBike(bikeForm: NgForm) { 
    this.crudService.insertBicicleta(this.bicicleta)
    this.toaster.success('Operacion Satisfactoria', 'Bicicleta Registrada');
    this.router.navigate(['listar-usuarios'])  
    bikeForm.reset();
  }

}
