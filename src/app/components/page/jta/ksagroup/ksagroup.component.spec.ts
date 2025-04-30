import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KsagroupComponent } from './ksagroup.component';

describe('KsagroupComponent', () => {
  let component: KsagroupComponent;
  let fixture: ComponentFixture<KsagroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KsagroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KsagroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
