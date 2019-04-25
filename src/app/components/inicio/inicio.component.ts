import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  poblacion;
  tiempo;

  public barChartOptions = {
    scaleShowVerticalLine: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65,25,56,80,34,16], label: 'Series A'},
    {data: [29, 48, 19, 86, 90], label: 'Seires B'}
  ];

  constructor() {
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
    this.tiempo=['Top de la semana', 'Top del mes', 'Top del semestre'];
   }

  ngOnInit() {
  }

}
