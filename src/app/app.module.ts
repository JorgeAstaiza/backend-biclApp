import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Route, RouterModule } from '@angular/router' 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
/**Componentes */
import { AppComponent } from './app.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { IncentivosComponent } from './components/incentivos/incentivos.component';
import { ReporteComponent } from './components/reporte/reporte.component'
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { ListarIncentivosComponent } from './components/listar-incentivos/listar-incentivos.component';
import { CodeqrComponent } from './components/codeqr/codeqr.component';
import { RegistrarBicicletaComponent } from './components/registrar-bicicleta/registrar-bicicleta.component';
import { ListarBicisComponent } from './components/listar-bicis/listar-bicis.component';
//import de chart.js
import { ChartsModule } from 'ng2-charts';
//servicios
import { AutorizacionService } from './services/autorizacion.service';
import { AutenticacionGuard } from './services/autenticacion.guard';
import { CrudService } from './services/crud.service';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
// generador codigo qr
import { NgxQRCodeModule } from 'ngx-qrcode2'
// cortar imagenes
import { ImageCropperModule } from 'ngx-image-cropper';

const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'inicio', component: InicioComponent, canActivate:[AutenticacionGuard]},
  {path: 'registrar-usuario', component: RegistrarUsuarioComponent, canActivate:[AutenticacionGuard]},
  {path: 'crear-incentivo', component: IncentivosComponent, canActivate:[AutenticacionGuard]},
  {path: 'reporte', component: ReporteComponent, canActivate:[AutenticacionGuard]},
  {path: 'listar-usuarios', component: ListarUsuariosComponent, canActivate:[AutenticacionGuard]},
  {path: 'listar-incentivos', component: ListarIncentivosComponent, canActivate:[AutenticacionGuard]},
  {path: 'codeqr', component: CodeqrComponent, canActivate:[AutenticacionGuard]},
  {path: 'registrar-bicicleta', component: RegistrarBicicletaComponent, canActivate:[AutenticacionGuard]},
  {path: 'listar-bicicletas', component: ListarBicisComponent, canActivate:[AutenticacionGuard]}
  
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
    ListarIncentivosComponent,
    CodeqrComponent,
    RegistrarBicicletaComponent,
    ListarBicisComponent
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
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    NgxQRCodeModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AutorizacionService, AutenticacionGuard, CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
