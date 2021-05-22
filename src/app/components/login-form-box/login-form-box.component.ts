import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form-box',
  templateUrl: './login-form-box.component.html',
  styleUrls: ['./login-form-box.component.scss']
})
export class LoginFormBoxComponent implements OnInit {
  isLogging = false;

  options = {
    isSignUpButtonHidden: true,
  };

  leftAreaImageAreaStyle = {
    'background-image': `url(${environment.image.cyber})`,
  };

  loginFormBoxStyle = {
    'width': '100%',
  };

  forms = {
    userId: '',
    userPassword: '',
  };

  events = {
    loginButtonClick: (event?: MouseEvent) => {
      const t = this;
      if (t.isLogging) {
        t.common.getAlertComponent()
          ?.setDefault();
        return;
      }

      const loginObservable = t.ajax.post(
        environment.api.user.login, 
        {
          userId: t.forms.userId,
          userPassword: t.forms.userPassword,
        },
      );

      t.isLogging = true;

      const result = loginObservable.subscribe(
        data => {
          if (data.result === 'success') {
            t.router.navigate(['']);
          } else {
            t.common.alertMessage(data);
          }

          t.isLogging = false;
        },
        error => {
          t.common.alertMessage(error);
          t.isLogging = false;
        },
      );
    },
    loginFromKeyUp: (event: KeyboardEvent) => {
      const t = this;

      if (event.key === 'Enter') {
        t.events.loginButtonClick();
      }
    },
  };

  constructor(
    private ajax: AjaxService,
    private common: CommonService,
    private router: Router,
  ) { 

  }

  ngOnInit(): void {
    const t = this;
    t.checkSize();
  }

  windowResize(): void {
    const t = this;
    t.checkSize();
  }

  checkSize(): void {
    const t = this;

    const windowWidth = window.innerWidth;
    
    if (windowWidth < 650) {
      t.loginFormBoxStyle['width'] = (windowWidth - 20) + 'px';
    } else {
      t.loginFormBoxStyle['width'] = '100%';
    }
  }
}
