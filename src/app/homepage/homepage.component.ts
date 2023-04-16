import { Component } from '@angular/core';
import { convertToParamMap, UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-homepage',
  template: `
  <div class="block has-background-succes">
    <section class="hero is small is-success is-bold has-text-white">
      <div class="hero-body">
        <div class="container has-text-centered has-text-white">
        <p class="title has-text-white">
        Welcome to
        </p>
        <img src="assets/Images/logo-no-background.png" width="300" height="300">
        </div>
      </div>
    </section>
  </div>
    <div class="container is-widescreen">
      <div class="notification has-text-success is-size-1 3rem has-text-centered has-text-weight-bold">
      Discover Garden Helper
      </div>
    </div>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-12">
      <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <p class="title">Get Organized</p>
            <p class="subtitle">With just a few clicks, you can create a personalized list of all the plants you have, complete with details about their characteristics, growth habits, and maintenance needs.</p>
            <figure class="image is-4by3">
              <img src="assets/Images/two-young-female-designers-discussing-online-proje-2022-02-15-20-16-23-utc.jpg">
            </figure>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <p class="title">Get Supplies</p>
            <p class="subtitle">From organic vegetable gardens to colorful flower beds, shop our curated list of tools, seeds, and supplies you'll need to get growing. </p>
            <figure class="image is-4by3">
              <img src="assets/Images/gardening-supplies-on-white-wooden-background-top-2021-12-24-06-17-59-utc.jpg">
            </figure>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <p class="title">Get Notified</p>
            <p class="subtitle">Our system tracks the growth and health of your plants, and sends you timely notifications with specific care instructions based on their unique needs.</p>
            <figure class="image is-4by3">
              <img src="assets/Images/planting-strawberries-in-the-garden-2021-12-13-14-56-18-utc.jpg">
            </figure>
          </article>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class HomepageComponent {

}


