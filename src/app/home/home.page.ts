import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public photo;
  currentImage: any;
  constructor(private camera: Camera, private storage: Storage) {}
  scanButton=false;
  processButton=true;
  showDiv=true;
  values: any = {};

  processPicture() {
    this.values = {
      "name" : "Image 3",
      "type" : "JPEG",
    }
    this.showDiv=false;
    this.processButton=true;
  }

  takePicture() {   
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.currentImage = 'data:image/jpeg;base64,' + imageData;
    // Save all photos for later viewing
      this.storage.set('photos', this.photo);
      this.scanButton=true;
      this.processButton=false;
  }, (err) => {
   // Handle error
   console.log("Camera issue:" + err);
  });
  }
}