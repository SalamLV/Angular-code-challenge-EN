import { TestBed } from '@angular/core/testing';

import { LicensePlateService } from './license-plate.service';
import { KentekenCheck } from 'rdw-kenteken-check';

describe('LicensePlateService', () => {
  let service: LicensePlateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicensePlateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format license plate AA14BB to AA-14-BB', () => {
    expect(service.formatLicensePlate('AA14BB')).toEqual('AA-14-BB');
  });

  it('should format license plate 12AABB to 12-AA-BB', () => {
    expect(service.formatLicensePlate('12AABB')).toEqual('12-AA-BB');
  });

  it('should return the input unchanged if it does not match known patterns', () => {
    const randomInput = '123XYZ'; // Not fitting any of the provided patterns
    expect(service.formatLicensePlate(randomInput)).toEqual(randomInput);
  });

  // validateLicensePlate

  it('should validate license plate', () => {
    spyOn(KentekenCheck.prototype, 'formatLicense').and.returnValue('AB-12-CD');
    expect(service.validateLicensePlate('AB12CD')).toBeTrue();
  });

  it('should invalidate incorrect license plate', () => {
    spyOn(KentekenCheck.prototype, 'formatLicense').and.returnValue('XX-XX-XX');
    expect(service.validateLicensePlate('AB1234')).toBeFalse();
  });
});
