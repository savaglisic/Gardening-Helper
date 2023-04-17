import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container has-text-centered">
      <p class="title">Welcome Back!</p>
    </div>
    <form (ngSubmit)="onSubmit(loginForm)" #loginForm="ngForm">
      <div class="hero is-medium">
        <div class="hero-body is-justify-content-center is-align-items-center">
          <div class="columns is-flex is-flex-direction-column box">
            <div class="column">
              <label for="email">Email</label>
              <input class="input is-primary" type="text" placeholder="Email address" name="email" [(ngModel)]="email" required>
            </div>
            <div class="column">
              <label for="Name">Password</label>
              <input class="input is-primary" type="password" placeholder="Password" name="password" [(ngModel)]="password" required>
              <a href="forget.html" class="is-size-7 has-text-primary">Forget password?</a>
            </div>
            <div class="column">
              <button class="button is-primary is-fullwidth" type="submit" [disabled]="loginForm.invalid">Login</button>
            </div>
            <div class="has-text-centered">
              <p class="is-size-7"> Don't have an account? <a href="#" class="has-text-primary">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
      private router: Router,
      private http: HttpClient,
      private authService: AuthService
  ) {}

  onSubmit(loginForm: NgForm) {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://127.0.0.1:5000/login', loginData).subscribe(
        (response) => {
          console.log(response);
          this.authService.setCurrentUser(this.email);
          this.router.navigate(['/mygarden']);
        },
        (error) => {
          console.error(error);
          alert("Invalid email or password. Please try again.");
        }
    );
  }
}
