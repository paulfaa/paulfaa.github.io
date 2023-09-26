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

  ngOnInit(){
    this.routeSubscription = this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['leagueId']) {
        console.log("naviated to standings with queryParam, check if data needs update")
        this.standings$ = this.standingsService.getStandingsForLeague(parseInt(queryParams['leagueId']));
      }
    });
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

  public callApi(leagueId: number): void{
    this.standings$ = this.standingsService.getStandingsForLeague(leagueId);
  }
}
