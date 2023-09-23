import { Component } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { StandingsService } from '../service/standings.service';
import { LeagueModel, StandingModel, StandingsResponseModel } from '../model/models';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-standings-grid',
  templateUrl: './standings-grid.component.html',
  styleUrls: ['./standings-grid.component.scss']
})
export class StandingsGridComponent {

  public displayedColumns: string[] = ['position', 'icon', 'name', 'games', 'wins', 'losses', 'draws', 'goalDifference', 'points'];
  public standings$?: Observable<StandingModel[]>
  //private dataSource = new MatTableDataSource<StandingModel>();

  constructor(private standingsService: StandingsService){
  }

  // standingsAsMatTableDataSource$: Observable<MatTableDataSource<StandingModel>> =
  //   this.standingsService.getStandings(39).pipe(
  //     map((standings) => {
  //       const dataSource = this.dataSource;
  //       dataSource.data = standings
  //       return dataSource;
  //     })
  // );

  ngOnInit(){
    this.standings$ = this.standingsService.standings$;
    this.standingsService.callStandingsEndpoint(39);
    
  }
}
