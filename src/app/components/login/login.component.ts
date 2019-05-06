import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginParams:any = {};
  email: string = null;
  password: string = null;
  constructor(private autorizacionService: AutorizacionService, private router: Router) {
   }
   login(){
    this.autorizacionService.login(this.email, this.password).then((data)=>{
      alert('logeado correctamente');
      this.router.navigate(['inicio']);
      console.log(data);
    }).catch((err)=>{
      alert('a ocurrido un err');
      console.log(err)
    })
   }

  ngOnInit() {
  }

}
