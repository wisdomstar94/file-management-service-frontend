import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  backgroundImageBoxStyle = {
    'background-image': `url(${environment.image.grid})`,
  };

  constructor() { 

  }

  ngOnInit(): void {

  }

}
