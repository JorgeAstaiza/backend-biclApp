import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { NgForm } from '@angular/forms';
import { Bicicleta } from 'src/app/models/bicicleta';

@Component({
  selector: 'app-registrar-bicicleta',
  templateUrl: './registrar-bicicleta.component.html',
  styleUrls: ['./registrar-bicicleta.component.css']
})
export class RegistrarBicicletaComponent implements OnInit {
  tiposBici;
  tipoBicicletaSeleccionada: string = '0';

  constructor(private crudService: CrudService) { 
    this.tiposBici = ['Ruta', 'Todo Terreno', 'BMX', 'Otro' ]
  }

  tipoSeleccionado(){
    this.tipoBicicletaSeleccionada;
  }
  registrarBici(){
    
  }
  resetForm(bikeForm: NgForm){
    if(bikeForm != null){
      bikeForm.reset();
      this.crudService.selectedBicicleta = new Bicicleta();
    }
  }
  onSubmit(bikeForm: NgForm) {
    this.crudService.insertBicicleta(bikeForm.value);      
    this.resetForm(bikeForm);
  }

  ngOnInit() {
  }

}
