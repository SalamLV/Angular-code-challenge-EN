import { Injectable } from '@angular/core';
import { KentekenCheck } from 'rdw-kenteken-check';

@Injectable({
  providedIn: 'root',
})
export class LicensePlateService {
  constructor() {}

  formatLicensePlate(value: string): string {
    // Remove non-alphanumeric characters
    let formatted = value.replace(/[^a-zA-Z0-9]/g, '');

    if (/^[A-Za-z]{2}\d{2}[A-Za-z]{2}$/.test(formatted)) {
      // Matches pattern like AA14BB
      formatted =
        formatted.slice(0, 2) +
        '-' +
        formatted.slice(2, 4) +
        '-' +
        formatted.slice(4);
    } else if (/^\d{2}[A-Za-z]{4}$/.test(formatted)) {
      // Matches pattern like 12AABB
      formatted =
        formatted.slice(0, 2) +
        '-' +
        formatted.slice(2, 4) +
        '-' +
        formatted.slice(4);
    }
    return formatted;
  }

  validateLicensePlate(value: string): boolean {
    let isValid: boolean = false;
    const kentekenCheckResult = new KentekenCheck(value).formatLicense();
    if (kentekenCheckResult !== 'XX-XX-XX') isValid = true;
    return isValid;
  }
}
