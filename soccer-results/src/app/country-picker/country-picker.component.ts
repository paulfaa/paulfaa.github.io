import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StandingsService } from '../standings.service';

@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrls: ['./country-picker.component.scss']
})
export class CountryPickerComponent {

  @Output() countrySelected = new EventEmitter<number>();

  constructor(private standingsService: StandingsService) {}

  onCountrySelected(leagueId: number) {
    console.log(leagueId)
    this.standingsService.getStandingsForLeage(leagueId);
    //this.countrySelected.emit(leagueId);
  }
}
