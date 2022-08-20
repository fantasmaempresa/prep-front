import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilitantListComponent } from './militant-list.component';

describe('MilitantListComponent', () => {
  let component: MilitantListComponent;
  let fixture: ComponentFixture<MilitantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilitantListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilitantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
