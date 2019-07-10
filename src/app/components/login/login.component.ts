import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginParams:any = {};
  email: string = null;
  password: string = null;
  constructor(private autorizacionService: AutorizacionService, private router: Router, private toaster: ToastrService) {
   }
   login(){
    this.autorizacionService.login(this.email, this.password).then((data)=>{
      this.router.navigate(['inicio']);
      console.log(data);
    }).catch((err)=>{
      this.toaster.error('ERROR', 'Usuario o Contraseña incorrectas');    
      console.log(err)
    })
   }

  ngOnInit() {
  }

}
