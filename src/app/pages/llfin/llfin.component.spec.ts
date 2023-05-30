import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlfinComponent } from './llfin.component';

describe('LlfinComponent', () => {
  let component: LlfinComponent;
  let fixture: ComponentFixture<LlfinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlfinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlfinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
