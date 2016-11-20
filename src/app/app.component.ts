import { Component } from '@angular/core';
import { myToasterConfig } from './constants/toaster-config';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'ChariLink';
  toasterConfig:ToasterConfig = myToasterConfig;
}
