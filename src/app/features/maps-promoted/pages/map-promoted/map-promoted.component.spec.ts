import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPromotedComponent } from './map-promoted.component';

describe('MapPromotedComponent', () => {
  let component: MapPromotedComponent;
  let fixture: ComponentFixture<MapPromotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPromotedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPromotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
