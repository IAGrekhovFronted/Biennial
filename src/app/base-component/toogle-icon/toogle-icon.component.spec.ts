import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToogleIconComponent } from './toogle-icon.component';

describe('ToogleIconComponent', () => {
  let component: ToogleIconComponent;
  let fixture: ComponentFixture<ToogleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToogleIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToogleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
