import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPipeDatePickedComponent } from './custom-pipe-date-picked.component';

describe('CustomPipeDatePickedComponent', () => {
  let component: CustomPipeDatePickedComponent;
  let fixture: ComponentFixture<CustomPipeDatePickedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomPipeDatePickedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomPipeDatePickedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
