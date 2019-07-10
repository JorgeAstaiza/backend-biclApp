import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Usuario } from 'src/app/models/usuario';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { Router } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { Bicicleta } from 'src/app/models/bicicleta';
import { NgForm, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { element } from '@angular/core/src/render3';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  editando: boolean = false;
  editingUser: Usuario
  userForm: FormGroup;
  poblacion;
  user: Usuario;
  picture: any;
  pictureBike: any;
  userList= [];
  visible: boolean = true;
  tipoSeleccionado: string = '0';
  verSeleccion: string = '';
  imageChangedEvent: any = '';
  imageChangedEventBike: any = '';
  croppedImage: any = '';
  croppeImageBike: any = '';
  showCropper = false;
  semestres;
  carreras;
  genero;
  dataUser;
  keyUsuario;
  idUsuario: string;
  usuarioBuscado = [];
  banderaUsuarioEncontrado = false;
  banderaUsuarioNoEncontrado = true;
  email;
  generoSeleccionado;
  constructor(public crudService: CrudService, private autorizacionServices: AutorizacionService, private router: Router, private firebaseStorage: AngularFireStorage, private toaster: ToastrService) { 
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
    this.semestres=[1,2,3,4,5,6,7,8,9,10];
    this.carreras=['Ingeniería de Sistemas Informáticos', 'Ingeniería Electrónica', 'Ingeniería Ambiental y Sanitaria', 'Pregrado en Finanzas y Negocios Internacionales', 'Derecho', 'Administración de Empresas', 'Entrenamiento Deportivo', 'Licenciatura en Educación Infantil', 'Contaduría Pública'];
    this.genero=['hombre', 'mujer']
    //this.editingUser = this.userList;

    
  }
  capturar(){
    this.verSeleccion = this.tipoSeleccionado; 
    if(this.verSeleccion == 'Estudiante'){
      this.visible = true;
    }else{
      this.visible = false;
    }
  }
  ngOnInit() { 
    this.crudService.getUsers().subscribe((item)=>{
      this.userList = item.map(e=>{
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }as Usuario
      });
      console.log(this.userList);
    })
  }
  emailUser(){
    //this.email = this.crudService.selectUser.email;
  }
  generoUsuario(){
    this.generoSeleccionado;
  }
  
  editUser(event, user){
   this.editingUser = user;
   console.log(this.editingUser)
   this.editando = !this.editando;
   this.keyUsuario = this.editingUser.id
  }
  generarQR(event, user){
    this.editingUser = user;
    this.keyUsuario = this.editingUser.id
  }
  updateUser(){
    this.crudService.updateUser(this.editingUser);
    this.editingUser = {} as Usuario;
    this.editando = false;
  }

  deleteUser(event, user){
    this.crudService.deleteProduct(user)
    this.toaster.success('Operacion Satisfactoria', 'Usuario eliminado');
    
  }
  logout(){
    this.autorizacionServices.logOut().then(()=>{
      this.router.navigate([''])
    }).catch((err)=>{
      console.log(err);
    });
  }

  consultaId(){
    this.usuarioBuscado = [];
    for(let i=0; this.userList.length; i++){
      if(this.userList[i].id == this.idUsuario){
        console.log(this.usuarioBuscado);
        this.usuarioBuscado.push(this.userList[i])
        this.banderaUsuarioNoEncontrado = false;
        this.banderaUsuarioEncontrado = true;
        break;
      }
      if(this.idUsuario == undefined){
        this.banderaUsuarioNoEncontrado = true;
        this.banderaUsuarioEncontrado = false;
        this.toaster.error('ERROR', 'Completa el campo');
        //break;
      }else{
        this.toaster.error('ERROR', 'Usuario no encontrado');
        this.banderaUsuarioNoEncontrado = true;
        this.banderaUsuarioEncontrado = false;
        //break;
      }
    }
  }
  actualizar(){
    if (this.croppedImage) {
      const userPictureId = Math.random().toString(36).substring(2);
      const pictures = this.firebaseStorage.ref('pictures/' + userPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + userPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.crudService.setAvatar(p, this.keyUsuario).then(() => {
            this.toaster.success('Operacion Satisfactoria', 'Imagen subida');
          }).catch((error) => {
            this.toaster.error('error', 'No se pudo subir la imagen');
            console.log(error);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
      this.croppedImage = "";
    }
  
}
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  fileChangeEventBike(event: any): void {
    this.imageChangedEventBike = event;
}
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
  }
  imageCroppedBike(event: ImageCroppedEvent) {
    this.croppeImageBike = event.base64;
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
  rotateLeft() {
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
  }

}
