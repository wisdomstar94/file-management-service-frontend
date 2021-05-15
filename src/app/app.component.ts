import { Component, OnInit } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'file-management-service-frontend';

  constructor(
    private common: CommonService,
  ) {

  }

  ngOnInit(): void {
    const t = this;
  }

  childComponentNgOnInited(component: any): void {
    const t = this;

    if (component instanceof AlertComponent) {
      t.common.setAlertComponent(component);
    }
  }
}
