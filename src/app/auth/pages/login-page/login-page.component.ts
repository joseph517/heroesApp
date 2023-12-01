import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin(){
    this.authService.login('email', 'password')
      .subscribe(
        user => {

          this.router.navigate(['/'])

        }
      )
  }
}
