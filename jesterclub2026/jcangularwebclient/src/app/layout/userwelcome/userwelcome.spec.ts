import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWelcome } from './userwelcome';

describe('UserWelcome', () => {
  let component: UserWelcome;
  let fixture: ComponentFixture<UserWelcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWelcome]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserWelcome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
