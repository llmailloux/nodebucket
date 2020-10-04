/*============================================
; Title:          home.component.ts
; Author:         Professor R. Krasso
; Modified by:    Laurie Mailloux
; Date:           27 September 2020
; Description:    home page
;===========================================*/


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
  
      document.body.style.background = '#ffefd5';
  }

  ngOnInit(): void {
  }

}
