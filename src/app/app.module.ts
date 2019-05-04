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
//servicio
import { AutorizacionService } from './services/autorizacion.service';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from '../environments/environment';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { ListarIncentivosComponent } from './components/listar-incentivos/listar-incentivos.component';
import { GuardService } from './services/guard.service';


const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'inicio', component: InicioComponent, canActivate:[GuardService]},
  {path: 'registrar-usuario', component: RegistrarUsuarioComponent, canActivate:[GuardService]},
  {path: 'crear-incentivo', component: IncentivosComponent, canActivate:[GuardService]},
  {path: 'reporte', component: ReporteComponent, canActivate:[GuardService]},
  {path: 'listar-usuarios', component: ListarUsuariosComponent, canActivate:[GuardService]},
  {path: 'listar-incentivos', component: ListarIncentivosComponent, canActivate:[GuardService]}
]

@NgModule({
  declarations: [
    AppComponent,
    RegistrarseComponent,
    InicioComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    IncentivosComponent,
    ReporteComponent,
    ListarUsuariosComponent,
    ListarIncentivosComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AutorizacionService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
