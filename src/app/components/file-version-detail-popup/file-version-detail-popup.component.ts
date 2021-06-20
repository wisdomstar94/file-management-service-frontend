import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { FileVersionFormBoxComponent } from '../file-version-form-box/file-version-form-box.component';

const popupAnimation = trigger('popupAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);

@Component({
  selector: 'app-file-version-detail-popup',
  templateUrl: './file-version-detail-popup.component.html',
  styleUrls: ['./file-version-detail-popup.component.scss'],
  animations: [
    popupAnimation,
  ]
})
export class FileVersionDetailPopupComponent implements OnInit {
  isShow: boolean;
  isLoading: boolean;
  fileVersionKey: string;

  @ViewChild('fileVersionFormBox') fileVersionFormBox!: FileVersionFormBoxComponent;

  constructor(
    private common: CommonService,
  ) { 
    this.isShow = false;
    this.isLoading = false;
    this.fileVersionKey = '';
  }

  ngOnInit(): void {
    // console.log('this.common.getCommonNavComponent()', this.common.getCommonNavComponent());
  }

  setFileVersionKey(fileVersionKey: string): void {
    this.fileVersionKey = fileVersionKey;
  }

  show(fileVersionKey: string): void {
 
    if (this.isShow === true) {
      return;
    }

    this.setFileVersionKey(fileVersionKey);

    this.common.getCommonNavComponent()!.zIndex = 1;
    this.common.getCommonContentComponent()!.zIndex = 3;

    // this.fileVersionFormBox.getFileVersionInfo();

    setTimeout(() => {
      this.isShow = true;
    }, 100);  
  }

  hide(): void {
    this.isShow = false;
    setTimeout(() => {
      console.log('??? / ???');
      this.common.getCommonNavComponent()!.zIndex = 3;
      this.common.getCommonContentComponent()!.zIndex = 1;
    }, 200);
  }

  closeButtonClick(): void {
    this.hide();
  }

  fileVersionInfoEditButtonClick(): void {
    
  }
}
