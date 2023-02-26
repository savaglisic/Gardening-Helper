import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" routerLink="/">
    Home
    </a>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" routerLink="/mygarden">
        My Garden
      </a>
      <a class="navbar-item" routerLink="/alerts">
        Alerts
      </a>
      <a class="navbar-item"  routerLink="/goodies">
        Gardening Goodies
      </a>
      <a class="navbar-item" routerLink="/ourmission">
        Our Mission
      </a>
      <a class="navbar-item" routerLink="/contact">
        Contact Us
      </a>
    </div>
    <div class="navbar-end">
      <div class="navbar-item" >
        <div class="buttons">
          <a class="button is-success" routerLink="/signup">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light" routerLink="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
  `,
  styles: [
  ]
})
export class HeaderComponent {

}
