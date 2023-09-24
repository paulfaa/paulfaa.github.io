import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrls: ['./country-picker.component.scss']
})
export class CountryPickerComponent {

  @Output() countrySelected = new EventEmitter<number>();
  public selectedLeagueId: number | undefined;

  onCountrySelected(leagueId: number): void {
    this.selectedLeagueId = leagueId;
    this.countrySelected.emit(this.selectedLeagueId);
    console.log("emitting leagueId: ", leagueId)
  }
}
