import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, catchError, filter, map, of, switchMap, tap } from 'rxjs';

import StorageUtils from '../util/storage.util';
import { StandingModel, StandingsResponseModel } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  private apiKey = "a13aeafb7b7f6b9c41c212b3197aa43c";
  private baseUrl = "https://v3.football.api-sports.io/standings"
  private standingsSubject = new BehaviorSubject<Map<number, StandingModel[]>>(new Map<number, StandingModel[]>());
  public standings$: Observable<Map<number, StandingModel[]>> = this.standingsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadSavedStandings();
  }

  /* public getStandings(leagueId: number): Observable<StandingModel[]> {
    return this.standings$.pipe(
      switchMap(data => {
        const standingsData = data.get(leagueId);
        if (standingsData !== undefined) {
          console.log("returning of(standingsData)")
          return of(standingsData);
        } else {
          return EMPTY;
        }
      }),
      catchError(() => EMPTY)
    );
  } */

  public callStandingsEndpoint(leagueId: number): void{
    if(this.checkIfStandingsAreCurrent(leagueId)){
      console.log("Standings are current, no need to update");
      return
    }
    else{
      var standingsUrl = this.buildStandingsUrl(leagueId);
      console.log("calling API at ", standingsUrl);
      var currentStandings : Map<number, StandingModel[]> = this.standingsSubject.getValue();
      this.httpClient.get<StandingsResponseModel>(standingsUrl, { headers: this.getRequiredHeaders()})
      .pipe(
        map(result => result as StandingsResponseModel),
        tap(data => {
          currentStandings.set(leagueId, data.response[0].league.standings)
          console.log("standings: ", currentStandings)
          StorageUtils.writeToStorage("standings", currentStandings)
          this.standingsSubject.next(currentStandings);
        })
      )
    }
  }

  /* public callStandingsEndpoint(leagueId: number): void{
    if(this.checkIfStandingsAreCurrent(leagueId)){
      console.log("Standings are current, no need to update");
      return
    }
    else{
      var standingsUrl = this.buildStandingsUrl(leagueId);
      console.log("calling API at ", standingsUrl);
      var currentStandings : Map<number, StandingModel[]> = this.standingsSubject.getValue();
      this.httpClient.get<StandingsResponseModel>(standingsUrl, { headers: this.getRequiredHeaders()})
      .pipe(
        map(result => result as StandingsResponseModel),
        tap(data => {
          currentStandings.set(leagueId, data.response[0].league.standings)
          console.log("currentStandings: ", currentStandings)
          this.standingsSubject.next(currentStandings);
        })
      ).subscribe(
        () => {},
        error => {
          console.error("HTTP request error:", error);
        }
      );
    }
  } */

  private checkIfStandingsAreCurrent(leagueId: number): boolean{
    if(this.standingsSubject.getValue().has(leagueId)){
      const standingModel = this.standingsSubject.getValue().get(leagueId);
      const currentTime = new Date().getTime();
      if(currentTime - standingModel![0].update.getTime() >= 86400000){ //considered current if less than 24 hours old
        return true;
      }
    }
    return false;
  }

  private buildStandingsUrl(leagueId: number): string{
    const currentSeason = new Date().getFullYear();
    var params = new HttpParams().set('league', leagueId).set('season', currentSeason);
    console.log(params)
    return `${this.baseUrl}?${params.toString()}`;
  }

  private loadSavedStandings(): void{
    const storedStandings = StorageUtils.readFromStorage('standings');
    if (storedStandings === null || (storedStandings?.size && storedStandings?.size <= 1)) {
      this.standingsSubject.next(new Map<number, StandingModel[]>());
    }
    else{
      this.standingsSubject.next(storedStandings!);
    }
  }

  private getRequiredHeaders(): HttpHeaders{
    return new HttpHeaders({
      "x-rapidapi-host": "v3.football.api-sports.io",
      'x-rapidapi-key' :  this.apiKey
    })
  }
}
