import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsDisplayComponent } from './standings-display.component';

describe('StandingsDisplayComponent', () => {
  let component: StandingsDisplayComponent;
  let fixture: ComponentFixture<StandingsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandingsDisplayComponent]
    });
    fixture = TestBed.createComponent(StandingsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
