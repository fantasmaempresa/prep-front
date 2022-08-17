import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilitantFormComponent } from './militant-form.component';

describe('MilitantFormComponent', () => {
  let component: MilitantFormComponent;
  let fixture: ComponentFixture<MilitantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MilitantFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MilitantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
