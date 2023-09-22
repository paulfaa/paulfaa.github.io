import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  
  private baseUrl = "https://v3.football.api-sports.io/standings"

  constructor(private httpClient: HttpClient) { }

  private getRequiredHeaders(): HttpHeaders{
    return new HttpHeaders({
      "x-rapidapi-host": "v3.football.api-sports.io",
      'x-rapidapi-key' :  this.apiKey
    })
  }

  public getStandingsForLeage(leagueId: number): Observable<any>{
    var standingsUrl = this.buildStandingsUrl(leagueId);
    console.log(standingsUrl)
    return this.httpClient.get<any>(standingsUrl);
  }

  private buildStandingsUrl(leagueId: number): string{
    const currentSeason = new Date().getFullYear();
    var params = new HttpParams().set('leagueId', leagueId).set('season', currentSeason);
    console.log(params)
    return `${this.baseUrl}?${params.toString()}`;
  }
}
