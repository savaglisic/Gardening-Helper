import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  template: `
   <div class="container is-widescreen">
  <div class="tile is-ancestor">
  <div class="tile is-vertical is-12">
    <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <p class="title">Welcome Back!</p>
          </article>
        </div>
      </div>
    </div>
  </div>
  </div>
    <form (ngSubmit)="onSubmit(loginForm)" #loginForm="ngForm">
      <div class="hero is-medium">
        <div class="hero-body is-justify-content-center is-align-items-center">
          <div class="columns is-flex is-flex-direction-column box">
            <div class="column">
              <label for="email">Email</label>
              <input class="input is-success" type="text" placeholder="Email address" name="email" [(ngModel)]="email" required>
            </div>
            <div class="column">
              <label for="Name">Password</label>
              <input class="input is-success" type="password" placeholder="Password" name="password" [(ngModel)]="password" required>
              <a href="forget.html" class="is-size-7 has-text-primary">Forget password?</a>
            </div>
            <div class="column">
              <button class="button is-success is-fullwidth" type="submit" [disabled]="loginForm.invalid">Login</button>
            </div>
            <div class="has-text-centered">
              <p class="is-size-7"> Don't have an account? <a href="#" class="has-text-success">Sign up</a>
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
