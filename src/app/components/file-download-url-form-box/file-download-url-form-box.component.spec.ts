import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDownloadUrlFormBoxComponent } from './file-download-url-form-box.component';

describe('FileDownloadUrlFormBoxComponent', () => {
  let component: FileDownloadUrlFormBoxComponent;
  let fixture: ComponentFixture<FileDownloadUrlFormBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDownloadUrlFormBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloadUrlFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
