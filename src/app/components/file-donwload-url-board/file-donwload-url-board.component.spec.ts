import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDonwloadUrlBoardComponent } from './file-donwload-url-board.component';

describe('FileDonwloadUrlBoardComponent', () => {
  let component: FileDonwloadUrlBoardComponent;
  let fixture: ComponentFixture<FileDonwloadUrlBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDonwloadUrlBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDonwloadUrlBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
