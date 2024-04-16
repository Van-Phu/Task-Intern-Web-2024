import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaceComponent } from './finace.component';

describe('FinaceComponent', () => {
  let component: FinaceComponent;
  let fixture: ComponentFixture<FinaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
