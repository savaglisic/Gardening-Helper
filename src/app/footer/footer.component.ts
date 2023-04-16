import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
    <div class="container is-widescreen">
      <div class="notification has-text-success is-size-6 3rem has-text-centered">
        <p>
          All your gardening needs just a click away.
          <br>-My Garden- -Alerts- -Gardening Goodies- -Our Mission- -Contact Us- 
        </p>
      </div>
    </div>
   </footer>
  `,
  styles: [
  ]
})
export class FooterComponent {

}
