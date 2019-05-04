import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/services/autorizacion.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  registro:any = {

  }
  constructor(private autorizacionService: AutorizacionService) {
    
   }
   registrar(){
    this.autorizacionService.registro(this.registro.email, this.registro.password);
   }

  ngOnInit() {
  }

}
