import { Component } from '@angular/core';
import { convertToParamMap, UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-homepage',
  template: `
  <div class="block">
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
<div class="block">
<div class="container is-widescreen">
  <div class="notification is-white has-text-black is-size-1 3rem has-text-centered has-text-weight-bold">
    Discover
  </div>
</div>
</div>
  <div class="block">
       <div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-success">
          <p class="title">Shop</p>
          <p class="subtitle">for all your <a href="http://localhost:4200/goodies">Gardening Goodies</a> with our convienant shopping feature. Not sure what you need? No problem. Select supplies from our curated list of must haves.</p>
        </article>
        <article class="tile is-child notification is-success">
          <p class="title">Add</p>
          <p class="subtitle">to your personal garden tracker using our extensive user created database.</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <p class="title">Connect</p>
          <p class="subtitle">share, and learn with other gardening enthusiasts.</p>
          <figure class="image is-4by3">
            <img src="assets/Images/happy-young-and-old-farmers-working-with-garden-to-2022-01-19-00-09-53-utc.jpg">
          </figure>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-success">
        <p class="title">Know</p>
        <p class="subtitle">when it's time to water, fertilize, or harvest your plants through our customizable <a href="http://localhost:4200/alerts">Alerts</a>. 
          We will keep you up to date with our email alerts to make sure you are getting the most our of your garden.</p>
        <div class="content">
          <!-- Content -->
        </div>
      </article>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child notification is-success">
      <div class="content">
        <p class="title">Organize</p>
        <p class="subtitle">and track all your plants in one convenient location. <a href="http://localhost:4200/mygarden">My Garden</a> allows you add notes, photos, and specific attributes to each plant</p>
        <figure class="image is-4by5">
            <img src="assets/Images/nature-2022-02-14-17-42-07-utc.jpg">
          </figure>
        <div class="content">
          <!-- Content -->
        </div>
      </div>
    </article>
  </div>
</div>
</div>
  `,
  styles: []
})
export class HomepageComponent {

}


