import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorListComponent } from './promotor-list.component';

describe('PromotorListComponent', () => {
  let component: PromotorListComponent;
  let fixture: ComponentFixture<PromotorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
