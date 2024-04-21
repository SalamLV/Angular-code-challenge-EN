import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ImageService } from './services/image.service';
import { LicensePlateService } from './services/license-plate.service';
import { PlateStatusComponent } from './PlateStatusComponent';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let imageServiceMock: any;
  let licensePlateServiceMock: any;

  beforeEach(async () => {
    imageServiceMock = {
      updateImagePath: jasmine.createSpy().and.returnValue('/assets/auto.jpg'),
    };
    licensePlateServiceMock = {
      formatLicensePlate: jasmine.createSpy().and.callFake((input) => input), // Simulating formatting function
      validateLicensePlate: jasmine.createSpy().and.returnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [AppComponent, PlateStatusComponent],
      providers: [
        { provide: ImageService, useValue: imageServiceMock },
        { provide: LicensePlateService, useValue: licensePlateServiceMock },
        provideMockStore({ initialState: {} }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.value).toEqual({
      vehicleType: 'Auto',
      vehicleSubType: null,
      kenteken: '',
    });
  });

  it('should update imagePath and currentSubtypes on vehicleType change', () => {
    component.form.controls['vehicleType'].setValue('Motor');
    fixture.detectChanges();
    expect(imageServiceMock.updateImagePath).toHaveBeenCalledWith('Motor');
    expect(component.imagePath).toBe('/assets/auto.jpg');
    expect(component.currentSubtypes).toEqual(
      component.vehicleSubtypes['Motor']
    );
  });

  it('should format the license plate correctly on input', () => {
    component.form.controls['kenteken'].setValue('AA12BB');
    expect(licensePlateServiceMock.formatLicensePlate).toHaveBeenCalledWith(
      'AA12BB'
    );
    expect(component.form.get('kenteken')?.value).toBe('AA12BB');
  });

  it('should dispatch savePlate action on valid form submission', () => {
    component.form.controls['kenteken'].setValue('AA-12-BB');
    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[Plate Component] Save Successful Plate',
        data: 'AA-12-BB',
      })
    );
  });

  it('should set error message on invalid license plate', () => {
    licensePlateServiceMock.validateLicensePlate.and.returnValue(false);
    component.form.controls['kenteken'].setValue('wrong');
    component.onSubmit();
    expect(component.isPlateError).toBeTrue();
    expect(component.errorMessage).toBe(
      'Helaas is het ingevoerde kenteken niet geldig. Probeer het opnieuw.'
    );
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
