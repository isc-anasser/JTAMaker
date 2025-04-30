import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetitemComponent } from './targetitem.component';

describe('TargetitemComponent', () => {
  let component: TargetitemComponent;
  let fixture: ComponentFixture<TargetitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
