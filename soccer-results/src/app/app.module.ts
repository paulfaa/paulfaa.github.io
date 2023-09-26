import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryPickerComponent } from './country-picker/country-picker.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

import { StandingsGridComponent } from './standings-grid/standings-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { FixturesComponent } from './fixtures/fixtures.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryPickerComponent,
    StandingsGridComponent,
    FixturesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonToggleModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
