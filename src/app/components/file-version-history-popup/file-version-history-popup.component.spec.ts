import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVersionHistoryPopupComponent } from './file-version-history-popup.component';

describe('FileVersionHistoryPopupComponent', () => {
  let component: FileVersionHistoryPopupComponent;
  let fixture: ComponentFixture<FileVersionHistoryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileVersionHistoryPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileVersionHistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
