import { Component } from '@angular/core';
import { convertToParamMap, UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-homepage',
  template: `
     <section class="hero is-warning is-bold is-fullheight has-text-white">
     <div class="hero-body">
      <div class="container has-text-centered has-text-white">
        <p class="title has-text-white">
          Welcome to
       </p>
       <img src="assets/Images/logo-no-background.png" width="350" height="350">
       </div>
    </div>
  </section>
  `,
  styles: []
})
export class HomepageComponent {

}
