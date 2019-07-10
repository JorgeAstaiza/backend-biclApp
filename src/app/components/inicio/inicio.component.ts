import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';
import { ChartType, Chart } from 'chart.js'
import { SingleDataSet, Label } from 'ng2-charts';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Usuario } from 'src/app/models/usuario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  userCollection: AngularFirestoreCollection<Usuario>  
  users: Observable<Usuario[]>;
  poblacion;
  tiempo;
  userList: Usuario[]
  totalEstudiantes: number = 0;
  totalDocentes: number = 0;
  totalAdministrativos: number = 0;
  totalOtros: number = 0;
  chart: any = []
  constructor(private autorizacionServices: AutorizacionService, private router: Router, public db: AngularFirestore, private crudService: CrudService) {
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
    this.tiempo=['Top de la semana', 'Top del mes', 'Top del semestre'];
    
   }
   ngOnInit() { 

    this.crudService.getUsers().subscribe((item)=>{
      this.userList = item.map(e=>{
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }as Usuario
      })
      for(let i=0; i <= this.userList.length-1; i++){
        if(this.userList[i].tipo == "Estudiante"){
          this.totalEstudiantes += 1;
          
        }
        if(this.userList[i].tipo == "Docente"){
          this.totalDocentes+= 1
          
        }
        if(this.userList[i].tipo == "Administrativo"){
          this.totalAdministrativos+= 1
                  
        }
        if(this.userList[i].tipo == "Otro"){
          this.totalOtros+= 1
        }
      }
      console.log(this.userList)
      this.chart = new Chart('canvas', {
        type: "polarArea",
        data: {
          labels: [
            'Estudiantes',
            'Docentes',
            'Administrativos',
            'Otro'
        ],
        datasets:[
          {data: [this.totalEstudiantes, this.totalDocentes, this.totalAdministrativos, this.totalOtros],
          backgroundColor: ['rgba(28, 125, 199, 0.6)', 'rgba(251, 254, 40, 0.6)', 'rgba(41, 219, 46, 0.6)', 'rgba(95, 207, 9, 0.6)']
          }
          
        ]
        }
      })
    })
    
  }
  prueba(){
    

  }
  /*
  // PolarArea
  public polarAreaChartLabels: Label[] = ['Estudiantes', 'Docentes', 'Administrativos', 'Otros'];
  public polarAreaChartData: SingleDataSet = [this.totalEstudiantes, this.totalDocentes, this.totalAdministrativos, this.totalOtros];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';
*/
  
   logout(){
     this.autorizacionServices.logOut().then(()=>{
       this.router.navigate([''])
     }).catch((err)=>{
       console.log(err);
     }); 
   }
 

}
