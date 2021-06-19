import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsSingleImageComponent } from './fms-single-image.component';

describe('FmsSingleImageComponent', () => {
  let component: FmsSingleImageComponent;
  let fixture: ComponentFixture<FmsSingleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmsSingleImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsSingleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
