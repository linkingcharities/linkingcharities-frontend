<<<<<<< HEAD
import { Component } from '@angular/core';
import { Router } from '@angular/router';
=======
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Hero } from "../../constants/data-types";
>>>>>>> [royson][mark] Setup basic FB authentication.

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {

  constructor(private router:Router) {
  }
}