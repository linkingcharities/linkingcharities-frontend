import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username:String = null;
  password:String = null;
  
  onSubmit():void {
    console.log("form submitted", this.username, this.password);
  }
}