import { Component } from '@angular/core';
import { convertToParamMap, UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-homepage',
  template: `
     <section class="hero is-warning is-bold is-fullheight has-text-white">
     <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          <!-- Welcome to -->
       </p>
       <img src="assets/Images/logo-no-background.png" width="350" height="350">
       </div>
    </div>
  </section>
  <img src="assets/Images/logo-no-background.png" width="250" height="250">
  `,
  styles: []
})
export class HomepageComponent {

}
