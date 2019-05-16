import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  email: string = null;
  password: string = null;
  nick: string = null;
  constructor(private autorizacionService: AutorizacionService, private adminService: AdminService) {
    
   }
   registrar(){
    this.autorizacionService.registro(this.email, this.password).then((data)=>{
      const admin = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
      };
      this.adminService.createAdmin(admin).then((data2)=>{
        alert('usuario registrado correctamente');
        console.log(data2);
      }).catch((err2)=>{
        alert('a ocurrido un err');
        console.log(err2)
      })
      alert('registrado correctamente');
      console.log(data);
    }).catch((err)=>{
      alert('a ocurrido un err');
      console.log(err)
    })
   }

  ngOnInit() {
  }

}
