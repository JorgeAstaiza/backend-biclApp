import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'backend-bike';
  loggenIn = false;
  constructor(private autorizacionService: AutorizacionService){
    this.autorizacionService.isLogged()
      .subscribe((result)=>{
        if(result && result.uid){
          this.loggenIn = true;
        }else{
          this.loggenIn = false;
        }
      }, (err)=>{
        this.loggenIn = false;
      })
  }
}
