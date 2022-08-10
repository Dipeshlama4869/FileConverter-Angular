import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isAdmin = false;
  isCollapsed = true;

  constructor(private router: Router, @Inject(AppComponent) private app: AppComponent) {
    if ((this.router.url).includes('hr')) {
      this.isCollapsed = false;
    }

    if(JSON.parse(localStorage.getItem('user') || '{}').Role.includes("Admin")){
      this.isAdmin = true;
      console.log("success")
    }else{
      console.log("fail")
    }
  }

  ngOnInit(): void {
  }

  toggleUserMenu() {
    const body = document.getElementsByClassName('user_div')[0];

    if (body.classList.contains('open')) {
      body.classList.remove('open');
    }
    else {
      body.classList.add('open');
    }
    document.getElementsByClassName('overlay')[0].classList.toggle("open");
  }

  toggleMenu() {
    const body = document.getElementsByTagName('body')[0];

    if (body.classList.contains('offcanvas-active')) {
      body.classList.remove('offcanvas-active');
    }
    else {
      body.classList.add('offcanvas-active');
    }
  }
}
