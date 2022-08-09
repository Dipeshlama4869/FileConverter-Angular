import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class LoginComponent implements OnInit {
  model: any = {}
  errorMessage!: string;
  isError: boolean = false;

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.model)
    this.accountService.login(this.model).subscribe((response) => {
      this.router.navigateByUrl('/dashboard')
      }, (error) => {
        if(error.status == 401){
          this.errorMessage = "Invalid Credentials"
          this.isError = !this.isError
        };
        if(error.status == 400){
          this.errorMessage = "Please input username and password"
          this.isError = !this.isError
        };
      })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}
