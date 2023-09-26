import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { StandingsGridComponent } from '../standings-grid/standings-grid.component';
import { ButtonContents } from '../model/models';

@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrls: ['./country-picker.component.scss']
})
export class CountryPickerComponent {

  public countryButtons: ButtonContents[] = [
    { buttonText: "England", leagueId:39, buttonId:"englandSelect" },
    { buttonText: "Spain", leagueId:140, buttonId:"spainSelect" },
    { buttonText: "Germany", leagueId:78, buttonId:"germanySelect" },
    { buttonText: "France", leagueId:61, buttonId:"franceSelect" },
    { buttonText: "Italy", leagueId:135, buttonId:"italySelect" }
  ];

  @ViewChild(StandingsGridComponent)
  standingsGridComponent?: StandingsGridComponent;

  onCountrySelected(leagueId: number): void {
    console.log("league selected: ", leagueId)
    this.standingsGridComponent?.callApi(leagueId);
  }
}
