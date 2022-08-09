import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: any
  
  constructor(private route: Router) {
    this.title = route.url;
    this.title = this.title.replace(/\//g, '');
    this.title = this.title.toUpperCase();
  }

  ngOnInit(): void {
    
  }
}
