import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
  imagePath: string = '/assets/auto.jpg';

  ngOnInit() {
    this.form = new FormGroup({
      vehicleType: new FormControl('Auto'),
      vehicleSubType: new FormControl(),
    });

    this.updateImagePath(this.form.value.vehicleType);
    this.currentSubtypes = this.vehicleSubtypes['Auto'];

    // Listen for changes on the vehicleType control
    this.form.get('vehicleType')!.valueChanges.subscribe((value) => {
      this.updateImagePath(value);
      this.currentSubtypes = this.vehicleSubtypes[value] || [];
    });
  }

  updateImagePath(vehicleType: string) {
    const autoPath = '/assets/auto.jpg';
    switch (vehicleType) {
      case 'Auto':
        this.imagePath = autoPath;
        break;
      case 'Motor':
        this.imagePath = '/assets/motor.jpg';
        break;
      case 'Scooter':
        this.imagePath = '/assets/scooter.jpg';
        break;
      default:
        this.imagePath = autoPath;
    }
  }
}
