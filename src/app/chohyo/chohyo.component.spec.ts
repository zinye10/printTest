import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChohyoComponent } from './chohyo.component';

describe('ChohyoComponent', () => {
  let component: ChohyoComponent;
  let fixture: ComponentFixture<ChohyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChohyoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChohyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
