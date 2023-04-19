import { Component } from '@angular/core';

@Component({
  selector: 'app-ourmission',
  template: `
   <div class="container is-widescreen">
  <div class="tile is-ancestor">
  <div class="tile is-vertical is-12">
    <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <p class="title">Our Mission</p>
          </article>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="container is-widescreen">
    <img src="assets/Images/happy-young-and-old-farmers-working-with-garden-to-2022-01-19-00-09-53-utc.jpg">
    <div class="is-overlay">
    <div class="notification is-success">
    <p class="is-centered is-size-4 has-text-white">
       Our mission is to provide gardeners with the tools and resources they need to plan, organize, and optimize their garden spaces. We believe that gardening is a fulfilling and important activity that benefits both individuals and communities. By helping gardeners stay organized and efficient, we hope to make the experience more enjoyable and rewarding for everyone involved. Our goal is to create a vibrant online community where gardeners can connect, learn from each other, and share their knowledge and experience.
    </p>
    </div>
   </div>
  </div>
  `,
  styles: [
  ]
})
export class OurmissionComponent {

}
