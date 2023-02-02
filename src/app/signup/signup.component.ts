import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container has-text-centered">
        <p class="title">
         Join our Gardening Family!
       </p>
       <div class="field">
  <label class="label">Full Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="e.g. John Doe">
  </div>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control">
    <input class="input" type="email" placeholder="e.g. johndoe@email.com">
  </div>
</div>

<div class="field">
  <label class="label">Username</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="This will be your gardening nickname!">
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
  <p class="help is-success">This username is available</p>
</div>

<div class="field">
<label class="label">Password</label>
  <p class="control has-icons-left">
    <input class="input" type="password" placeholder="Password">
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
  </p>
</div>

<div class="field">
<label class="label">Confrim Password</label>
  <p class="control has-icons-left">
    <input class="input" type="password" placeholder="Re-Enter Password">
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
  </p>
</div>

<div class="field">
  <p class="control is-centered">
    <button class="button is-success">
      Sign-Up
    </button>
  </p>
</div>

  `,
  styles: [
  ]
})
export class SignupComponent {

}
