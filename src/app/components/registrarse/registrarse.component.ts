import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  email: string = null;
  password: string = '';
  repetPassword: string = '';
  nick: string = null;
  constructor(private autorizacionService: AutorizacionService, private adminService: AdminService,  private toaster: ToastrService) {
    
   }
   registrar(){
    if(this.password == this.repetPassword){
      this.autorizacionService.registro(this.email, this.password).then((data)=>{
        const admin = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        };
        this.adminService.createAdmin(admin).then((data2)=>{ 
          this.toaster.success('Operacion Satisfactoria', 'Usuario Registrado');
        }).catch((err2)=>{
          this.toaster.error('ERROR', 'No se pudo registrar el usuario, intentalo de nuevo');       
          console.log(err2)
        })
        console.log(data);
      }).catch((err)=>{
        this.toaster.error('ERROR', err);       
        console.log(err)
      })
    }else{
      this.toaster.error('ERROR', 'Las contraseñas no coiciden');       
    }
   }
  
  ngOnInit() {
  }

}
