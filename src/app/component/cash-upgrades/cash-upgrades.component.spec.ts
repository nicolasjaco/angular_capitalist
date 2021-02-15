import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashUpgradesComponent } from './cash-upgrades.component';

describe('CashUpgradesComponent', () => {
  let component: CashUpgradesComponent;
  let fixture: ComponentFixture<CashUpgradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashUpgradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashUpgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
