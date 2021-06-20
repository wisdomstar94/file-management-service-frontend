import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVersionBoardComponent } from './file-version-board.component';

describe('FileVersionBoardComponent', () => {
  let component: FileVersionBoardComponent;
  let fixture: ComponentFixture<FileVersionBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileVersionBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileVersionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
