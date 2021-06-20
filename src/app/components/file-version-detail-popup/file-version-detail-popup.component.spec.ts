import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVersionDetailPopupComponent } from './file-version-detail-popup.component';

describe('FileVersionDetailPopupComponent', () => {
  let component: FileVersionDetailPopupComponent;
  let fixture: ComponentFixture<FileVersionDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileVersionDetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileVersionDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
