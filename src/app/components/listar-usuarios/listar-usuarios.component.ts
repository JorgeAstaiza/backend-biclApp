import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Usuario } from 'src/app/models/usuario';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  poblacion;
  userList: Usuario[]
  constructor(private crudService: CrudService, private autorizacionServices: AutorizacionService, private router: Router) { 
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];

  }

  ngOnInit() {
    this.crudService.getUsers()
      .snapshotChanges()
      .subscribe(item =>{
        this.userList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.userList.push(x as Usuario)
        })
      })
  }
  onEdit(user: Usuario){
    this.crudService.selectUser = user;
  }
  onDelete($key:string){

  }
  logout(){
    this.autorizacionServices.logOut().then(()=>{
      this.router.navigate([''])
    }).catch((err)=>{
      console.log(err);
    });
  }

}
