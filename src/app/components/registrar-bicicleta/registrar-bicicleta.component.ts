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
  bikeForm: FormGroup
  registrar: boolean = false;
  tiposBici;
  userList: Usuario[];
  user: Usuario;
  x;
  idUsuario;
  tipoBicicletaSeleccionada: string = '0';
    constructor(private crudService: CrudService, private toaster: ToastrService, private firebaseStorage: AngularFireStorage, private router: Router) { 
    this.tiposBici = ['Ruta', 'Todo Terreno', 'BMX', 'Otro' ]

  }
  ngOnInit() {
    this.crudService.getUsers()
      .snapshotChanges()
      .subscribe(item =>{
        this.userList = [];
        item.forEach(element => {
          this.x = element.payload.toJSON();
          this.x["$key"] = element.key;          
          this.userList.push(this.x as Usuario)
          //console.log(this.userList[$key])
        })
      })
      this.idUsuario = this.x["$key"]
      //this.crudService.selectUser = user;
  }

  tipoSeleccionado(){
    this.tipoBicicletaSeleccionada;
  }
  registrarBici(){
    if(this.crudService.selectedBicicleta.color != null && this.crudService.selectedBicicleta.marca != null && this.crudService.selectedBicicleta.serial != null && this.crudService.selectedBicicleta.identificacion != null){
      this.registrar = true;
      
      console.log('se registro bici en registrar')

    }else{
      this.toaster.error('error', 'Todos los campos debes estar completos');
    }
  }
  resetForm(bikeForm: NgForm){
    if(bikeForm != null){
      bikeForm.reset();
      this.crudService.selectedBicicleta = new Bicicleta();
    }
  }
  onSubmit(bikeForm: NgForm) {
    if(bikeForm.valid){
      this.crudService.insertBicicleta(bikeForm.value);      
      this.resetForm(bikeForm);
      this.toaster.success('Operacion Satisfactoria', 'Bicicleta Registrada');
      this.router.navigate(['listar-usuarios'])
      console.log('se registro bici onsubmit')
    }
    
  }

}
