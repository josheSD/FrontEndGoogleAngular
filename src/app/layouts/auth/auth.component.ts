import { Component, OnInit } from '@angular/core';
declare function appJs();

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent implements OnInit {

  constructor() { 
    appJs();
  }

  ngOnInit(): void {
  }

}
