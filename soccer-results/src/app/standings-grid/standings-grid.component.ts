import { Component, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StandingsService } from '../service/standings.service';
import { StandingsModel } from '../model/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-standings-grid',
  templateUrl: './standings-grid.component.html',
  styleUrls: ['./standings-grid.component.scss']
})
export class StandingsGridComponent implements OnDestroy {
  @Input() selectedLeagueId: number | undefined;
  public countryClicked: boolean;
  public routeSubscription: Subscription;
  public standings$: Observable<StandingsModel[]>
  public displayedColumns: string[] = ['position', 'icon', 'name', 'games', 'wins', 'losses', 'draws', 'goalDifference', 'points'];

  constructor(private standingsService: StandingsService, private route: ActivatedRoute){
    this.standings$ = new Observable<StandingsModel[]>();
    this.routeSubscription = new Subscription();
    this.countryClicked = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedLeagueId'] && changes['selectedLeagueId'].currentValue !== undefined) {
      this.countryClicked = true;
      console.log("changes detected, calling getStandingsForLeague()")
      this.standings$ = this.standingsService.getStandingsForLeague(changes['selectedLeagueId'].currentValue);
    }
  }

  ngOnInit(){
    this.routeSubscription = this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['leagueId']) {
        console.log("naviated to standings with queryParam, call API")
        this.standings$ = this.standingsService.getStandingsForLeague(queryParams['leagueId']);
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
