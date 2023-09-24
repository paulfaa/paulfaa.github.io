import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryPickerComponent } from './country-picker/country-picker.component';
import { FixturesComponent } from './fixtures/fixtures.component';

const routes: Routes = [
  { path: '', redirectTo: '/standings', pathMatch: 'full' },
  { path: 'standings', component: CountryPickerComponent },
  { path: 'standings/:leagueId', component: CountryPickerComponent },
  { path: 'fixtures/:teamId', component: FixturesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
