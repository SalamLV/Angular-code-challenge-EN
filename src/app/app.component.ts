import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from './services/image.service';
import { LicensePlateService } from './services/license-plate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  readonly DEFAULT_VEHICLE_TYPE: string = 'Auto';
  form!: FormGroup;
  vehicleSubtypes: { [key: string]: string[] } = {
    Auto: [
      'Hatchback',
      'Sedan',
      'Station',
      'Cabriolet',
      'Coupé',
      'Multi Purpose Vehicle (MVP)',
      'Terreinauto',
    ],
    Motor: [
      'All-road',
      'Naked',
      'Enduro',
      'Race',
      'Toermotor',
      'Chopper',
      'Zijspan',
    ],
    Scooter: [],
  };
  currentSubtypes: string[] = [];
  imagePath!: string;
  isPlateError: boolean = false;
  errorMessage: string = '';

  constructor(
    private imageService: ImageService,
    private licensePlateService: LicensePlateService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      vehicleType: new FormControl(this.DEFAULT_VEHICLE_TYPE),
      vehicleSubType: new FormControl(),
      kenteken: new FormControl('', Validators.required),
    });

    this.imagePath = this.imageService.updateImagePath(
      this.DEFAULT_VEHICLE_TYPE
    );
    this.currentSubtypes = this.vehicleSubtypes[this.DEFAULT_VEHICLE_TYPE];

    // Listen for changes on the vehicleType control
    this.form.get('vehicleType')!.valueChanges.subscribe((value) => {
      this.imagePath = this.imageService.updateImagePath(value);
      this.currentSubtypes = this.vehicleSubtypes[value] || [];
    });

    this.form.get('kenteken')!.valueChanges.subscribe((value) => {
      const formattedValue: string =
        this.licensePlateService.formatLicensePlate(value);
      this.form.get('kenteken')!.setValue(formattedValue, { emitEvent: false });
    });
  }

  onSubmit() {
    this.isPlateError = false;
    if (!this.form.controls['kenteken'].valid) {
      this.isPlateError = true;
      this.errorMessage = 'Kenteken mag niet leeg zijn.'; // I hope "Google Translate" translated this text correctly to Dutch
      return;
    }

    const licensePlate = this.form.get('kenteken')?.value || '';
    if (!this.licensePlateService.validateLicensePlate(licensePlate)) {
      this.isPlateError = true;
      this.errorMessage =
        'Helaas is het ingevoerde kenteken niet geldig. Probeer het opnieuw.';
      return;
    }
    console.log('Kenteken is Ok');
  }
}
