import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryPickerComponent } from './country-picker/country-picker.component';

const routes: Routes = [
  { path: '', component: CountryPickerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
