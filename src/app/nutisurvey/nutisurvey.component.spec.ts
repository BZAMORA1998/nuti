import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutisurveyComponent } from './nutisurvey.component';

describe('NutisurveyComponent', () => {
  let component: NutisurveyComponent;
  let fixture: ComponentFixture<NutisurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutisurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutisurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
