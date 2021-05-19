import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTopHeaderComponent } from './common-top-header.component';

describe('CommonTopHeaderComponent', () => {
  let component: CommonTopHeaderComponent;
  let fixture: ComponentFixture<CommonTopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonTopHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
