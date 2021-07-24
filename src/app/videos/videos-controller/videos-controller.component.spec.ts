import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosControllerComponent } from './videos-controller.component';

describe('VideosControllerComponent', () => {
  let component: VideosControllerComponent;
  let fixture: ComponentFixture<VideosControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
