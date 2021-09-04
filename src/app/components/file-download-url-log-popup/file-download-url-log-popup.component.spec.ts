import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDownloadUrlLogPopupComponent } from './file-download-url-log-popup.component';

describe('FileDownloadUrlLogPopupComponent', () => {
  let component: FileDownloadUrlLogPopupComponent;
  let fixture: ComponentFixture<FileDownloadUrlLogPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDownloadUrlLogPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloadUrlLogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
