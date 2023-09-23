import { Component, EventEmitter, Output } from '@angular/core';
import { StandingsService } from '../service/standings.service';

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
    this.standingsService.callStandingsEndpoint(leagueId);
  }
}
