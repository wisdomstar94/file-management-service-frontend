import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDownloadUrlDetailPopupComponent } from './file-download-url-detail-popup.component';

describe('FileDownloadUrlDetailPopupComponent', () => {
  let component: FileDownloadUrlDetailPopupComponent;
  let fixture: ComponentFixture<FileDownloadUrlDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDownloadUrlDetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloadUrlDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
