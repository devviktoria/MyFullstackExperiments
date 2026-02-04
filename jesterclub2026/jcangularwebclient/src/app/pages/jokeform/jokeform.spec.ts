import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jokeform } from './jokeform';

describe('Jokeform', () => {
  let component: Jokeform;
  let fixture: ComponentFixture<Jokeform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jokeform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jokeform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
