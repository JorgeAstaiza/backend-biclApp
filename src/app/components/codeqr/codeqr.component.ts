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
      .snapshotChanges()
      .subscribe(item =>{
        this.userList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.userList.push(x as Usuario)
          console.log(this.userList);
          this.value = x["$key"];

        })
      })

  }

}
