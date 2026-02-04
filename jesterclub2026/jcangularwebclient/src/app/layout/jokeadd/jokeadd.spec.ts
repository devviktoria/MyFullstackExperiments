import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jokeadd } from './jokeadd';

describe('Jokeadd', () => {
  let component: Jokeadd;
  let fixture: ComponentFixture<Jokeadd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jokeadd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jokeadd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
