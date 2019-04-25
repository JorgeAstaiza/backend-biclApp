import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Route, RouterModule } from '@angular/router' 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
//import de chart.js
import { ChartsModule } from 'ng2-charts';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { IncentivosComponent } from './components/incentivos/incentivos.component';
import { ReporteComponent } from './components/reporte/reporte.component'


const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'registrar-usuario', component: RegistrarUsuarioComponent},
  {path: 'crear-incentivo', component: IncentivosComponent},
  {path: 'reporte', component: ReporteComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegistrarseComponent,
    InicioComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    IncentivosComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
