import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPipeStatusComponent } from './custom-pipe-status.component';

describe('CustomPipeStatusComponent', () => {
  let component: CustomPipeStatusComponent;
  let fixture: ComponentFixture<CustomPipeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomPipeStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomPipeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
