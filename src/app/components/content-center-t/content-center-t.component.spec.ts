import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCenterTComponent } from './content-center-t.component';

describe('ContentCenterTComponent', () => {
  let component: ContentCenterTComponent;
  let fixture: ComponentFixture<ContentCenterTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCenterTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCenterTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
