import { Component, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { StandingsService } from '../service/standings.service';
import { StandingModel } from '../model/models';

@Component({
  selector: 'app-standings-grid',
  templateUrl: './standings-grid.component.html',
  styleUrls: ['./standings-grid.component.scss']
})
export class StandingsGridComponent {
  @Input() selectedLeagueId: number | undefined;
  public standings$: Observable<StandingModel[]>
  public displayedColumns: string[] = ['position', 'icon', 'name', 'games', 'wins', 'losses', 'draws', 'goalDifference', 'points'];

  constructor(private standingsService: StandingsService){
    this.standings$ = new Observable<StandingModel[]>();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedLeagueId'] && changes['selectedLeagueId'].currentValue !== undefined) {
      console.log("changes detected, calling api")
      this.standings$ = this.standingsService.getStandingsForLeague(changes['selectedLeagueId'].currentValue);
    }
  }

  ngOnInit(){
    this.standings$ = this.standingsService.getStandingsForLeague(39); //get premier league standings on load as button selected by default
  }

  public callApi(leagueId: number){
    this.standings$ = this.standingsService.getStandingsForLeague(leagueId);
  }
}
