import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVersionFormBoxComponent } from './file-version-form-box.component';

describe('FileVersionFormBoxComponent', () => {
  let component: FileVersionFormBoxComponent;
  let fixture: ComponentFixture<FileVersionFormBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileVersionFormBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileVersionFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
