import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickDonationComponent } from './quick-donation.component';

describe('QuickDonationComponent', () => {
  let component: QuickDonationComponent;
  let fixture: ComponentFixture<QuickDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickDonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
