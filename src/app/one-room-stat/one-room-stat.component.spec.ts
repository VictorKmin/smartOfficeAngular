import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRoomStatComponent } from './one-room-stat.component';

describe('OneRoomStatComponent', () => {
  let component: OneRoomStatComponent;
  let fixture: ComponentFixture<OneRoomStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneRoomStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneRoomStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
