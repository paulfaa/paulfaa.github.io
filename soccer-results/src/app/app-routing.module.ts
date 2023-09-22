import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsDisplayComponent } from './standings-display/standings-display.component';

const routes: Routes = [
  { path: '', component: StandingsDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
