import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HousagotchiBalloonComponent} from './housagotchi-balloon.component';

describe('HousagotchiBalloonComponent', () => {
  let component: HousagotchiBalloonComponent;
  let fixture: ComponentFixture<HousagotchiBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousagotchiBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousagotchiBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
