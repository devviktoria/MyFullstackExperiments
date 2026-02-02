import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jokelist } from './jokelist';

describe('Jokelist', () => {
  let component: Jokelist;
  let fixture: ComponentFixture<Jokelist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jokelist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jokelist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
