import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryPickerComponent } from './country-picker/country-picker.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', redirectTo: '/standings', pathMatch: 'full' },
  { path: 'standings', component: CountryPickerComponent },
  { path: 'standings/:leagueId', component: CountryPickerComponent },
  { path: 'results/:teamId', component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
