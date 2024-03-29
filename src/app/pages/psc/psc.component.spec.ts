import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PscComponent } from './psc.component';

describe('PscComponent', () => {
  let component: PscComponent;
  let fixture: ComponentFixture<PscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
