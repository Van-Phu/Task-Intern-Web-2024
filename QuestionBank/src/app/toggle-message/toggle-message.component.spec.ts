import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleMessageComponent } from './toggle-message.component';

describe('ToggleMessageComponent', () => {
  let component: ToggleMessageComponent;
  let fixture: ComponentFixture<ToggleMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggleMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
