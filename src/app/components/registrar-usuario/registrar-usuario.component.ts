import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
//servicio
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { CrudService } from 'src/app/services/crud.service';
import { Usuario } from 'src/app/models/usuario';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';
import { FirebaseFirestore } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage'
import { AdminService } from 'src/app/services/admin.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper'
//import { ImageCroppedEvent } from './image-cropper/interfaces/image-cropped-event.interface';
//import { ImageCropperComponent } from './image-cropper/component/image-cropper.component';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
 
export class RegistrarUsuarioComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  registerForm: FormGroup;
  submitted = false;
  picture: any;
  poblacion;
  identificaciones;
  semestres;
  carreras;
  genero;
  visible: boolean = false;
  carreraSeleccionada: string = '0';
  semestreSeleccionado: string = '0';
  idSeleccionado: string = '0';
  tipoSeleccionado: string = '0';
  verSeleccion: string = '';
  generoSeleccionado: string = '0';
  email: string = null;
  emailUs: string = null;
  UserPassword: string = null;
  constructor(private formBuilder: FormBuilder, 
    private crudService: CrudService, 
    private autorizacionServices: AutorizacionService, 
    private router: Router,
    private adminService: AdminService,
    private firebaseStorage: AngularFireStorage) { 
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
    this.identificaciones=['Cédula de ciudadanía', 'Codigo Estudiantil', 'Tarjeta de identidad', 'Tarjeta de pasaporte']
    this.semestres=[1,2,3,4,5,6,7,8,9,10];
    this.carreras=['Ingeniería de Sistemas Informáticos', 'Ingeniería Electrónica', 'Ingeniería Ambiental y Sanitaria', 'Pregrado en Finanzas y Negocios Internacionales', 'Derecho', 'Administración de Empresas', 'Entrenamiento Deportivo', 'Licenciatura en Educación Infantil', 'Contaduría Pública'];
    this.genero=['hombre', 'mujer']
  }

  capturar(){
    this.verSeleccion = this.tipoSeleccionado;
    if(this.verSeleccion == 'Estudiante'){
      this.visible = true;
    }else{
      this.visible = false;
    }
  }
  seleccionarFoto(){
    this.picture = this.crudService.selectUser.avatar;
  }
  generoUsuario(){
    this.generoSeleccionado;
  }
  emailUser(){
    this.email = this.crudService.selectUser.email;
  }
  idUsuario(){
    this.idSeleccionado;
  }
  semestreUsuario(){
    this.semestreSeleccionado;
  }

  carreraUsuario(){
    this.carreraSeleccionada;
  }
  ngOnInit(){
    this.crudService.getUsers();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
  
  });
  }
  get f() { return this.registerForm.controls; }

  resetForm(userForm: NgForm){
    if(userForm != null){
      userForm.reset();
      this.crudService.selectUser = new Usuario();
    }
  }
  logout(){
    this.autorizacionServices.logOut().then(()=>{
      this.router.navigate([''])
    }).catch((err)=>{
      console.log(err);
    });
  }
  onSubmit(userForm: NgForm) {
    this.crudService.insertUser(userForm.value);
    this.resetForm(userForm);

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
  registrar(){
    if(this.croppedImage){
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.crudService.setAvatar(p, this.crudService.selectUser.identificacion).then(() => {
            alert('Avatar subido correctamentne');
          }).catch((error) => {
            alert('Hubo un error al tratar de subir la imagen');
            console.log(error);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
      this.autorizacionServices.registro(this.email, this.UserPassword).then((data)=>{
        const user = {
          //uid: data.user.uid,
          password: this.UserPassword,
          email: this.email
        }
      }).catch((err)=>{
        alert('a ocurrido un err');
        console.log(err)
      })
    }
   }
   //@ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

   fileChangeEvent(event: any): void {
       this.imageChangedEvent = event;
   }
   imageCropped(event: ImageCroppedEvent) {
     this.croppedImage = event.base64;
     console.log(event);
   }
   imageLoaded() {
     this.showCropper = true;
      console.log('Image loaded')
   }
   cropperReady() {
     console.log('Cropper ready')
   }
   loadImageFailed () {
     console.log('Load failed');
   }
   /*rotateLeft() {
     this.imageCropper.rotateLeft();
   }
   rotateRight() {
     this.imageCropper.rotateRight();
   }
   flipHorizontal() {
     this.imageCropper.flipHorizontal();
   }
   flipVertical() {
     this.imageCropper.flipVertical();
   }*/
}

