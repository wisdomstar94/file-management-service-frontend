import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBasicFormBoxComponent } from './file-basic-form-box.component';

describe('FileBasicFormBoxComponent', () => {
  let component: FileBasicFormBoxComponent;
  let fixture: ComponentFixture<FileBasicFormBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileBasicFormBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBasicFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
