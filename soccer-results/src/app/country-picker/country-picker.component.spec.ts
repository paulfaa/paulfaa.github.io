import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPickerComponent } from './country-picker.component';

describe('CountryPickerComponent', () => {
  let component: CountryPickerComponent;
  let fixture: ComponentFixture<CountryPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryPickerComponent]
    });
    fixture = TestBed.createComponent(CountryPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
