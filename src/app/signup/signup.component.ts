import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container">
      <h2 class="title is-2 is-capitalized has-text-centered">Join Our Gardening Family</h2>
      <form (ngSubmit)="onSubmit(signupForm)" #signupForm="ngForm" method="post">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="firstName"
                  [(ngModel)]="firstName"
                  #firstNameInput="ngModel"
                  required>
              </div>
              <p class="help is-danger" *ngIf="firstNameInput.invalid && firstNameInput.touched">
                Please enter your first name
              </p>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="lastName"
                  [(ngModel)]="lastName"
                  #lastNameInput="ngModel"
                  required>
              </div>
              <p class="help is-danger" *ngIf="lastNameInput.invalid && lastNameInput.touched">
                Please enter your last name
              </p>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              name="email"
              [(ngModel)]="email"
              #emailInput="ngModel"
              required
              email>
          </div>
          <p class="help is-danger" *ngIf="emailInput.invalid && emailInput.touched">
            Please enter a valid email address
          </p>
        </div>
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="username"
              [(ngModel)]="username"
              #usernameInput="ngModel"
              required>
          </div>
          <p class="help is-danger" *ngIf="usernameInput.invalid && usernameInput.touched">
            Please enter a username
          </p>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              name="password"
              [(ngModel)]="password"
              #passwordInput="ngModel"
              required>
          </div>
          <p class="help is-danger" *ngIf="passwordInput.invalid && passwordInput.touched">
            Please enter a password
          </p>
        </div>
        <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                name="confirmPassword"
                [(ngModel)]="confirmPassword"
                #confirmPasswordInput="ngModel"
                required>
            </div>
            <p class="help is-danger" *ngIf="confirmPasswordInput.invalid && confirmPasswordInput.touched">
              Please confirm your password
            </p>
          </div>

          <button type="submit" class="button is-primary is-fullwidth" [disabled]="signupForm.invalid">Sign Up</button>
        </form>
    </div>
`,
  styles: [
  ]
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSubmit(signupForm: NgForm) {
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.username);
    console.log(this.email);
    console.log(this.password);
    console.log(this.confirmPassword);
    alert("Thank you for signing up!");
    signupForm.resetForm();
    this.router.navigate(['/login']);
  }
}





