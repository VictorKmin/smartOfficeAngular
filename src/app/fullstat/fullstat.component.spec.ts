import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullstatComponent } from './fullstat.component';

describe('FullstatComponent', () => {
  let component: FullstatComponent;
  let fixture: ComponentFixture<FullstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
