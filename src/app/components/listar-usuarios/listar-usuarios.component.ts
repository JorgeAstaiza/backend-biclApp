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

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  userForm: FormGroup;
  poblacion;
  user: Usuario;
  bicicletasList: Bicicleta[];
  bicicleta: Bicicleta;
  picture: any;
  pictureBike: any;
  userList: Usuario[];
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
  x;
  keyUsuario;
  constructor(private crudService: CrudService, private autorizacionServices: AutorizacionService, private router: Router, private firebaseStorage: AngularFireStorage, private toaster: ToastrService) { 
    this.poblacion=['Estudiante', 'Docente', 'Administrativo', 'Otro'];
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
  ngOnInit() {
    
    this.crudService.getUsers()
      .snapshotChanges()
      .subscribe(item =>{
        this.userList = [];
        this.bicicletasList = [];
        item.forEach(element => {
          this.x = element.payload.toJSON();
          this.x["$key"] = element.key;
          this.bicicletasList.push(this.x.bicicletas as Bicicleta);
          this.userList.push(this.x as Usuario)
          //console.log(this.userList[x])
        })
      })
  }
  
  onSubmit(userForm: NgForm){
    this.crudService.updateUser(userForm.value)
    console.log('usuario actualizado');
  }
  onEdit(user: Usuario){
    this.crudService.selectUser = Object.assign({}, user);
    this.keyUsuario = this.crudService.selectUser.$key
    console.log('el id del seleccionado es ' + this.keyUsuario)
    //this.crudService.selectedBicicleta = bicicleta;
  }
  onDelete($key:string){
    this.crudService.deleteProduct($key);
    this.toaster.success('Operacion Satisfactoria', 'Usuario eliminado');
  }
  logout(){
    this.autorizacionServices.logOut().then(()=>{
      this.router.navigate([''])
    }).catch((err)=>{
      console.log(err);
    });
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
  actualizarBike(){
    if (this.croppedImage) {
      const userPictureId = Math.random().toString(36).substring(2);
      const pictureBike = this.firebaseStorage.ref('bicicletas/' + userPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictureBike.then((result) => {
        this.picture = this.firebaseStorage.ref('bicicletas/' + userPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.crudService.setAvatarBike(p, this.keyUsuario).then(() => {
            this.toaster.success('Operacion Satisfactoria', 'Imagen de bicicleta subida');    
          }).catch((error) => {
            this.toaster.error('error', 'No se pudo subir la imagen');
            console.log(error);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    }
    this.croppedImage = "";
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
