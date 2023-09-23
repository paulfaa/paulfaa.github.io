import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  private teamId: number = 0;

  public constructor(private activatedRoute: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.teamId = parseInt(this.activatedRoute.snapshot.paramMap.get('teamId')!);
  }

  public goBack(): void {
    this.router.navigate(['standings'],{queryParams:{leagueId:69}})
    //this.router.navigateByUrl('/standings/69')
    //emit league id here, should be inside teams response
  }
}
