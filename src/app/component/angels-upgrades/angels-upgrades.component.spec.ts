import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngelsUpgradesComponent } from './angels-upgrades.component';

describe('AngelsUpgradesComponent', () => {
  let component: AngelsUpgradesComponent;
  let fixture: ComponentFixture<AngelsUpgradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngelsUpgradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngelsUpgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
