import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, filter, map, of, take, tap } from 'rxjs';

import StorageUtils from '../util/storage.util';
import { FixtureDetailsModel, FixtureResponseModel, StandingsModel, StandingsResponseModel } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  private apiKey = "a13aeafb7b7f6b9c41c212b3197aa43c";
  private baseUrl = "https://v3.football.api-sports.io"
  private storedStandings: Map<number, StandingsModel[]>;

  constructor(private httpClient: HttpClient) {
    this.storedStandings = new Map<number, StandingsModel[]>();
    this.loadSavedStandings();
  }

  public getStandingsForLeague(leagueId: number): Observable<StandingsModel[]> {
    if (this.checkIfStandingsAreCurrent(leagueId)) {
      console.log("Standings are current, no need to call API");
      return of(this.storedStandings.get(leagueId)!);
    }
    else {
      const standingsUrl = this.buildStandingsUrl(leagueId);
      console.log("calling standings API at ", standingsUrl);
      return this.httpClient.get<StandingsResponseModel>(standingsUrl, { headers: this.getRequiredHeaders() })
        .pipe(
          map(result => result.response[0].league.standings[0] as StandingsModel[]),
          take(10),
          tap(data => {
            this.storedStandings.set(leagueId, data)
            console.log("standings from server: ", data)
            StorageUtils.writeToStorage("standings", this.storedStandings)
          })
        )
    }
  }

  public getFixturesForTeam(teamId: number): Observable<FixtureDetailsModel[]> {
    const fixturesUrl = this.buildFixturesUrl(teamId);
    console.log("calling fixtures API at ", fixturesUrl);
    return this.httpClient.get<FixtureResponseModel>(fixturesUrl, { headers: this.getRequiredHeaders() })
        .pipe(
          tap(data => {
            console.log("data before map: ", data)
          }),
          map(data => data.response.filter(fixture => fixture.teams.home.id == teamId || fixture.teams.away.id == teamId)),
          tap(data => {
            console.log("data after map: ", data)
          })
        )
  }

  private checkIfStandingsAreCurrent(leagueId: number): boolean {
    if (this.storedStandings.has(leagueId)) {
      const updateTime = new Date(this.storedStandings.get(leagueId)![0].update).getTime();
      const currentTime = new Date().getTime();
      if (currentTime - updateTime <= 86400000) { //considered current if less than 24 hours old
        return true;
      }
    }
    return false;
  }

  private buildStandingsUrl(leagueId: number): string {
    const currentSeason = new Date().getFullYear();
    const params = new HttpParams().set('league', leagueId).set('season', currentSeason);
    return `${this.baseUrl + '/standings'}?${params.toString()}`;
  }

  private buildFixturesUrl(teamId: number): string{
    const params = new HttpParams().set('team', teamId).set('last', 10);
    return `${this.baseUrl + '/fixtures'}?${params.toString()}`;
  }

  private loadSavedStandings(): void {
    const savedStandings = StorageUtils.readFromStorage('standings');
    if (savedStandings && savedStandings?.size >= 1) {
      console.log("loading saved standings")
      this.storedStandings = savedStandings;
    }
    else {
      console.log("no saved standings")
    }
  }

  private getRequiredHeaders(): HttpHeaders {
    return new HttpHeaders({
      "x-rapidapi-host": "v3.football.api-sports.io",
      'x-rapidapi-key': this.apiKey
    })
  }
}
