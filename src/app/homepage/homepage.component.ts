import { Component } from '@angular/core';
import { convertToParamMap, UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-homepage',
  template: `
    <section class="hero is-warning is-bold is-fullheight">
     <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
         Welcome to Gardening Helper!
       </p>
       </div>
    </div>
  </section>
  `,
  styles: []
})
export class HomepageComponent {

}
