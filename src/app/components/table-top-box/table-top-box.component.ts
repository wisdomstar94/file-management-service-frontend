import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SelectItem } from 'src/app/interfaces/select-item.interface';
import { SelectedInfo } from 'src/app/interfaces/selected-info.interface';
import { DeviceMode } from 'src/app/types/device-mode.type';
import { TableViewType } from 'src/app/types/table-view-type.type';

@Component({
  selector: 'app-table-top-box',
  templateUrl: './table-top-box.component.html',
  styleUrls: ['./table-top-box.component.scss']
})
export class TableTopBoxComponent implements OnInit {
  total: number;

  @Input() viewCountHide: boolean;
  @Input() tableViewType: TableViewType = 'row';
  @Output() tableViewTypeChanged = new EventEmitter();
  @Output() viewCountChanged = new EventEmitter();

  viewCountSelectList: SelectItem[] = [
    {
      optionUniqueID: '5',
      optionDisplayText: '5개',
      optionValue: '5',
      selected: false,
    },
    {
      optionUniqueID: '10',
      optionDisplayText: '10개',
      optionValue: '10',
      selected: true,
    },
    {
      optionUniqueID: '20',
      optionDisplayText: '20개',
      optionValue: '20',
      selected: false,
    },
    {
      optionUniqueID: '50',
      optionDisplayText: '50개',
      optionValue: '50',
      selected: false,
    },
    {
      optionUniqueID: '100',
      optionDisplayText: '100개',
      optionValue: '100',
      selected: false,
    },
  ];

  viewCountInfo: SelectedInfo = {
    selectedValue: '10',
  };

  deviceMode$: Observable<DeviceMode>;

  constructor(
    private store: Store<{ deviceMode: DeviceMode }>,
  ) { 
    this.viewCountHide = false;
    this.total = 0;
    this.deviceMode$ = this.store.select('deviceMode');
  }

  ngOnInit(): void {
    this.deviceMode$.subscribe(
      data => {
        if (data === 'mobile') {
          // mobile
          this.tableViewType = 'card';
        } else {
          // pc 
          this.tableViewType = 'row';
        }
        this.tableViewTypeChanged.emit(this.tableViewType);
      }
    );
  }

  setTotalCount(totalCount: number): void {
    this.total = totalCount;
  }

  getViewCount(): number {
    const t = this;
    return Number(t.viewCountInfo.selectedValue);
  }

  setViewCount(v: string): void {
    this.viewCountInfo.selectedValue = v;
  }

  viewCountChange(): void {
    this.viewCountChanged.emit(this.viewCountInfo.selectedValue);
  }
}
