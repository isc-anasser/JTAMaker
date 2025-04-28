import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JtaComponent } from './jta.component';

describe('JtaComponent', () => {
  let component: JtaComponent;
  let fixture: ComponentFixture<JtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
