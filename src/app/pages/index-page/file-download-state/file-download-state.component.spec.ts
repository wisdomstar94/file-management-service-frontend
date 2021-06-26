import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDownloadStateComponent } from './file-download-state.component';

describe('FileDownloadStateComponent', () => {
  let component: FileDownloadStateComponent;
  let fixture: ComponentFixture<FileDownloadStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDownloadStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloadStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
