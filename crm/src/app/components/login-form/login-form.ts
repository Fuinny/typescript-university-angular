import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {
  public isLogin: boolean = true;
  public email: string | null = null;
  public password: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  public onLogin() {
    if (this.email && this.password) {
      if (this.isLogin) {
        this.authService.signin(this.email, this.password).subscribe({
          next: () => {
            this.router.navigate(["/"]);
          },
          error: () => { }
        });
      } else {
        this.authService.signup(this.email, this.password).subscribe({
          next: () => {
            this.router.navigate(["/"]);
          },
          error: () => { }
        });
      }

    }
  }
}
