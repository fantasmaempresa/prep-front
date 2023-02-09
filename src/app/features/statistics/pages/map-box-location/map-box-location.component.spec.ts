import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBoxLocationComponent } from './map-box-location.component';

describe('MapBoxLocationComponent', () => {
  let component: MapBoxLocationComponent;
  let fixture: ComponentFixture<MapBoxLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapBoxLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapBoxLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
