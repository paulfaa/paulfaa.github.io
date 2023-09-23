import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, catchError, filter, map, of, switchMap, take, tap } from 'rxjs';

import StorageUtils from '../util/storage.util';
import { StandingModel, StandingsResponseModel } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  private apiKey = "a13aeafb7b7f6b9c41c212b3197aa43c";
  private baseUrl = "https://v3.football.api-sports.io/standings"
  private storedStandings: Map<number, StandingModel[]>;

  constructor(private httpClient: HttpClient) {
    this.storedStandings = new Map<number, StandingModel[]>();
    this.loadSavedStandings();
  }

  public getStandingsForLeague(leagueId: number): Observable<StandingModel[]>{
    if(this.checkIfStandingsAreCurrent(leagueId)){
      console.log("Standings are current, no need to update");
      return of(this.storedStandings.get(leagueId)!);
    }
    else{
      var standingsUrl = this.buildStandingsUrl(leagueId);
      console.log("calling API at ", standingsUrl);
      return this.httpClient.get<StandingsResponseModel>(standingsUrl, { headers: this.getRequiredHeaders()})
      .pipe(
        map(result => result.response[0].league.standings as StandingModel[]),
        take(10),
        tap(data => {
          this.storedStandings.set(leagueId, data)
          console.log("standings from server: ", data)
          StorageUtils.writeToStorage("standings", this.storedStandings)
        })
      )
    }
  }

  private checkIfStandingsAreCurrent(leagueId: number): boolean{
    if(this.storedStandings.has(leagueId)){
      const updateTime = new Date(this.storedStandings.get(leagueId)![0].update).getTime();
      const currentTime = new Date().getTime();
      if(currentTime - updateTime >= 86400000){ //considered current if less than 24 hours old
        return true;
      }
    }
    return false;
  }

  private buildStandingsUrl(leagueId: number): string{
    const currentSeason = new Date().getFullYear();
    var params = new HttpParams().set('league', leagueId).set('season', currentSeason);
    return `${this.baseUrl}?${params.toString()}`;
  }

  private loadSavedStandings(): void{
    const savedStandings = StorageUtils.readFromStorage('standings');
    if (savedStandings && savedStandings?.size >= 1) {
      console.log("loading saved standings")
      this.storedStandings = savedStandings;
    }
    else{
      console.log("no saved standings")
    }
  }

  private getRequiredHeaders(): HttpHeaders{
    return new HttpHeaders({
      "x-rapidapi-host": "v3.football.api-sports.io",
      'x-rapidapi-key' :  this.apiKey
    })
  }
}
