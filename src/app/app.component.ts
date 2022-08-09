import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Epic';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) { }

  ngOnInit(): void {

  }

  closeMenu() {
    const userDiv = document.getElementsByClassName('user_div')[0];
    const overlay = document.getElementsByClassName('overlay')[0];
    const right_sidebar = document.getElementsByClassName('right_sidebar')[0];

    userDiv.classList.remove("open");
    overlay.classList.remove("open");
    right_sidebar.classList.remove("open");
  }
}
