import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryPickerComponent } from './country-picker/country-picker.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';

import { StandingsGridComponent } from './standings-grid/standings-grid.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CountryPickerComponent,
    StandingsGridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonToggleModule,
    MatTableModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
