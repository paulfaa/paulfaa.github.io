import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixtureDetailsModel } from '../model/models';
import { Observable, tap } from 'rxjs';
import { StandingsService } from '../service/standings.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent {

  private selectedTeamId?: number;
  private selectedLeagueId?: number;
  public fixtures$?: Observable<FixtureDetailsModel[]>
  public displayedColumns: string[] = ['homeIcon', 'homeTeam', 'homeScore', 'divider', 'awayScore', 'awayTeam', 'awayIcon'];

  public constructor(private activatedRoute: ActivatedRoute, private router: Router, private standingsService: StandingsService){}

  ngOnInit(){
    this.selectedTeamId = parseInt(this.activatedRoute.snapshot.paramMap.get('teamId')!);
    this.fixtures$ = this.standingsService.getFixturesForTeam(this.selectedTeamId).pipe(
      tap(data => this.selectedLeagueId = data[0]?.league?.id)
    );
  }

  public goBack(): void {
    this.router.navigate(['standings'],{queryParams:{leagueId:this.selectedLeagueId}})
  }
}
