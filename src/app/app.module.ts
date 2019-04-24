import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Route, RouterModule } from '@angular/router' 

import { AppComponent } from './app.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';


const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'inicio', component: InicioComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegistrarseComponent,
    InicioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
