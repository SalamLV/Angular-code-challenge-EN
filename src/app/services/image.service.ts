import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  updateImagePath(vehicleType: string) {
    const autoIconPath: string = '/assets/auto.jpg';
    const motorIconPath: string = '/assets/motor.jpg';
    const scooterIconPath: string = '/assets/scooter.jpg';
    switch (vehicleType) {
      case 'Auto':
        return autoIconPath;
        break;
      case 'Motor':
        return motorIconPath;
        break;
      case 'Scooter':
        return scooterIconPath;
        break;
      default:
        return autoIconPath;
    }
  }
}
