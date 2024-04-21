import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';

describe('VehicleImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct path for Auto', () => {
    const path = service.updateImagePath('Auto');
    expect(path).toEqual('/assets/auto.jpg');
  });

  it('should return correct path for Motor', () => {
    const path = service.updateImagePath('Motor');
    expect(path).toEqual('/assets/motor.jpg');
  });

  it('should return correct path for Scooter', () => {
    const path = service.updateImagePath('Scooter');
    expect(path).toEqual('/assets/scooter.jpg');
  });

  it('should return default path for unknown vehicle type', () => {
    const path = service.updateImagePath('Truck');
    expect(path).toEqual('/assets/auto.jpg');
  });

  it('should return default path when no vehicle type is provided', () => {
    const path = service.updateImagePath('');
    expect(path).toEqual('/assets/auto.jpg');
  });
});
