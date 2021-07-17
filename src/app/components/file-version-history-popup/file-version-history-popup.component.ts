import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileVersionHistoryItem } from 'src/app/interfaces/file-version-history-item.intreface';
import { DeviceMode } from 'src/app/types/device-mode.type';
import { TableViewType } from 'src/app/types/table-view-type.type';
import { PopupBoxComponent } from '../popup-box/popup-box.component';

@Component({
  selector: 'app-file-version-history-popup',
  templateUrl: './file-version-history-popup.component.html',
  styleUrls: ['./file-version-history-popup.component.scss']
})
export class FileVersionHistoryPopupComponent implements OnInit {
  @ViewChild('popupBox') popupBox!: PopupBoxComponent;
  @Input() isShow: boolean;

  @Input() fileVersionHistoryItems: FileVersionHistoryItem[];

  deviceMode: DeviceMode;
  deviceMode$: Observable<string>;

  tableViewType: TableViewType;

  constructor(
    private store: Store<{ deviceMode: DeviceMode }>,
  ) { 
    this.isShow = false;

    this.fileVersionHistoryItems = [];

    this.tableViewType = 'row';
    this.deviceMode = 'pc';
    this.deviceMode$ = this.store.select('deviceMode');
    this.deviceMode$.subscribe(
      data => {
        this.deviceMode = data as DeviceMode;

        if (this.deviceMode === 'pc') {
          this.tableViewType = 'row';
        } else {
          this.tableViewType = 'card';
        }
      }
    );
  }

  ngOnInit(): void {

  }

  show(): void {
    this.isShow = true;
  }

  hide(): void {
    this.isShow = false;
  }

  closeButtonClicked(event: MouseEvent): void {
    this.hide();
  }
}
