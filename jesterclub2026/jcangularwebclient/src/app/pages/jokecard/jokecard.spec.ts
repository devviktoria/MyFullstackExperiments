import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jokecard } from './jokecard';

describe('Jokecard', () => {
  let component: Jokecard;
  let fixture: ComponentFixture<Jokecard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jokecard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jokecard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
