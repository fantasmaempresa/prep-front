import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticProfileFormComponent } from './politic-profile-form.component';

describe('PoliticProfileFormComponent', () => {
  let component: PoliticProfileFormComponent;
  let fixture: ComponentFixture<PoliticProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticProfileFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
