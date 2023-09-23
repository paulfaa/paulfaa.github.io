import { Component, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StandingsService } from '../service/standings.service';
import { StandingModel } from '../model/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-standings-grid',
  templateUrl: './standings-grid.component.html',
  styleUrls: ['./standings-grid.component.scss']
})
export class StandingsGridComponent implements OnDestroy {
  @Input() selectedLeagueId: number | undefined;
  public routeSubscription: Subscription;
  public standings$: Observable<StandingModel[]>
  public displayedColumns: string[] = ['position', 'icon', 'name', 'games', 'wins', 'losses', 'draws', 'goalDifference', 'points'];

  constructor(private standingsService: StandingsService, private route: ActivatedRoute){
    this.standings$ = new Observable<StandingModel[]>();
    this.routeSubscription = new Subscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedLeagueId'] && changes['selectedLeagueId'].currentValue !== undefined) {
      console.log("changes detected, calling api")
      this.standings$ = this.standingsService.getStandingsForLeague(changes['selectedLeagueId'].currentValue);
    }
  }

  ngOnInit(){
    this.routeSubscription = this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['leagueId']) {
        console.log("naviated to standings with queryParam, call API")
        this.standings$ = this.standingsService.getStandingsForLeague(39);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

  public callApi(leagueId: number){
    this.standings$ = this.standingsService.getStandingsForLeague(leagueId);
  }
}
