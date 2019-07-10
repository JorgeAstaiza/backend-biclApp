import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Bicicleta } from 'src/app/models/bicicleta';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-listar-bicis',
  templateUrl: './listar-bicis.component.html',
  styleUrls: ['./listar-bicis.component.css']
})
export class ListarBicisComponent implements OnInit {
  editingBike: Bicicleta;
  editando: boolean = false;
  imageChangedEvent: any = '';
  imageChangedEventBike: any = '';
  croppedImage: any = '';
  croppeImageBike: any = '';
  showCropper = false;
  bicicletasList= [];
  bicicleta: Bicicleta;
  dataBike;
  idUsuario;
  usuarioBuscado = [];
  banderaUsuarioEncontrado = false;
  banderaUsuarioNoEncontrado = true;
  keyBike;
  tiposBici;
  tipoBicicletaSeleccionada: string = '0';
  picture;
  email;
  constructor(private crudService: CrudService, private firebaseStorage: AngularFireStorage, private firebase: AngularFireDatabase, private toaster: ToastrService) {
    this.tiposBici = ['Ruta', 'Todo Terreno', 'BMX', 'Otro' ]

   }
  
  tipoSeleccionado(){
    this.tipoBicicletaSeleccionada;
  }
  emailUser(){
    //this.email = this.crudService.selectedBicicleta.identificacion;
  }
  ngOnInit() {
    this.crudService.getBicicleta()
    .subscribe(item =>{
      this.bicicletasList = item;
      
    })
  }
  editBike(event, bicicleta){
    this.editingBike = bicicleta;
    console.log(this.editingBike)
    this.editando = !this.editando;
    this.keyBike = this.editingBike.id; 
  }
  updateBike(){
    this.crudService.updateBike(this.editingBike);
    this.editingBike = {} as Bicicleta;
    this.editando = false;
  }
  
  actualizarBike(){
    if (this.croppedImage) {
      const userPictureId = Math.random().toString(36).substring(2);
      const pictureBike = this.firebaseStorage.ref('bicicletas/' + userPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictureBike.then((result) => {
        this.picture = this.firebaseStorage.ref('bicicletas/' + userPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.crudService.setAvatarBike(p, this.keyBike).then(() => {
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

consultarBicicletas(){
  this.usuarioBuscado = [];
  console.log(this.bicicletasList);
  for(let i=0; this.bicicletasList.length; i++){
    if(this.bicicletasList[i].id == this.idUsuario){
      console.log(this.usuarioBuscado);
      this.usuarioBuscado.push(this.bicicletasList[i])
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
