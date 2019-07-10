import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-codeqr',
  templateUrl: './codeqr.component.html',
  styleUrls: ['./codeqr.component.css']
})
export class CodeqrComponent implements OnInit {
  userList: Usuario[]
  value;

  constructor(private crudService: CrudService) { 
    console.log(this.value);
  }
  elementType : 'url' | 'canvas' | 'img' = 'url';
  //value = this.userList[0];
  ngOnInit() {
    this.crudService.getUsers()
      .subscribe(item =>{
        //this.userList = item;
        
      })      

  }

}
