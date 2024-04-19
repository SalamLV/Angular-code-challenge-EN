import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { PlateStatusComponent } from './PlateStatusComponent';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { plateReducer } from './store/plate/plate.reducer';

@NgModule({
  declarations: [AppComponent, PlateStatusComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ plateData: plateReducer }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
